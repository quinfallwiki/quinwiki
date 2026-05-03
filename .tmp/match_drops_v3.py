"""v3: composite icons on dark bg + crop to alpha bbox + skip badge in cell."""
import os, json, glob
from PIL import Image, ImageDraw
import numpy as np

ROOT = r'C:/Users/tr/Desktop/QuinWiki'
ICON_DIR = f'{ROOT}/public/assets/icons'
DROP_DIR = f'{ROOT}/public/assets/quinfall/dungeons'
OUT = f'{ROOT}/.tmp/drops_matched_v3.json'
DEBUG_DIR = f'{ROOT}/.tmp/match_debug_v3'
os.makedirs(DEBUG_DIR, exist_ok=True)

ICON_SIZE = 40
EMPTY_SCORE_THRESHOLD = 30


def grid_for(W, H):
    sx, sy = W / 433, H / 257
    return {
        'x0': int(14 * sx), 'step_x': 48 * sx, 'cell_w': int(46 * sx),
        'y0': int(96 * sy), 'step_y': 60 * sy, 'cell_h': int(46 * sy),
    }


def prep_icon(path):
    """Composite RGBA on dark, crop to alpha bbox, resize to ICON_SIZE square."""
    im = Image.open(path)
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    # crop to alpha bbox
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if bbox:
        im = im.crop(bbox)
    # composite on dark gray (game UI background)
    bg = Image.new('RGBA', im.size, (28, 24, 30, 255))
    composed = Image.alpha_composite(bg, im).convert('RGB')
    # square pad: pad shorter dim with same dark
    w, h = composed.size
    side = max(w, h)
    sq = Image.new('RGB', (side, side), (28, 24, 30))
    sq.paste(composed, ((side - w) // 2, (side - h) // 2))
    return np.array(sq.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS), dtype=np.float32)


print('loading + prepping icons...')
ICONS = {}
for fp in glob.glob(f'{ICON_DIR}/*.png'):
    code = os.path.basename(fp).rsplit('.', 1)[0]
    try:
        ICONS[code] = prep_icon(fp)
    except Exception as e:
        print(f'skip {code}: {e}')
ICON_CODES = list(ICONS.keys())
ICON_STACK = np.stack([ICONS[c] for c in ICON_CODES])
print(f'prepared {len(ICONS)} icons at {ICON_SIZE}x{ICON_SIZE}')


def cell_score(cell_img, cw, ch):
    center = cell_img.crop((6, 6, cw - 6, ch - 6))
    arr = np.array(center)
    return float(arr.std() + arr.max() * 0.1)


def prep_cell(cell_img, cw, ch):
    """Crop cell to skip the top-left badge (qty/star) area, resize."""
    # cell is ~46x46. Badge is in top-left ~14x14. Crop a center-bottom region.
    # Take y from 4..end-2, x from 4..end-2, then mask top-left badge.
    inner = cell_img.crop((3, 3, cw - 3, ch - 3))
    iw, ih = inner.size
    # paint over top-left 14x14 with avg color (blank out badge)
    arr = np.array(inner).copy()
    # paint top-left badge area with avg of bottom-right area
    bg_color = arr[ih // 2:, iw // 2:, :].mean(axis=(0, 1)).astype(np.uint8)
    arr[:14, :14, :] = bg_color
    inner_clean = Image.fromarray(arr)
    # square pad
    side = max(iw, ih)
    sq = Image.new('RGB', (side, side), (28, 24, 30))
    sq.paste(inner_clean, ((side - iw) // 2, (side - ih) // 2))
    return np.array(sq.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS), dtype=np.float32)


def match_icon(prepped_cell):
    diff = ICON_STACK - prepped_cell
    mse = np.mean(diff ** 2, axis=(1, 2, 3))
    idx = int(np.argmin(mse))
    return ICON_CODES[idx], float(mse[idx])


def process(path):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    g = grid_for(W, H)
    name = os.path.basename(path).rsplit('.', 1)[0]
    results = []
    debug_im = im.copy()
    dr = ImageDraw.Draw(debug_im)
    for r in range(5):
        for c in range(8):
            x = g['x0'] + int(c * g['step_x'])
            y = g['y0'] + int(r * g['step_y'])
            if y + g['cell_h'] > H + 4:
                continue
            cell = im.crop((x, y, x + g['cell_w'], y + g['cell_h']))
            s = cell_score(cell, g['cell_w'], g['cell_h'])
            if s < EMPTY_SCORE_THRESHOLD:
                continue
            prepped = prep_cell(cell, g['cell_w'], g['cell_h'])
            code, mse = match_icon(prepped)
            results.append({'row': r, 'col': c, 'iconCode': code, 'mse': round(mse, 1)})
            dr.rectangle([x, y, x + g['cell_w'], y + g['cell_h']], outline=(60, 200, 60), width=2)
    debug_im.save(f'{DEBUG_DIR}/{name}_grid.png')
    return results


all_results = {}
for sp in sorted(glob.glob(f'{DROP_DIR}/*.png')):
    key = os.path.basename(sp).rsplit('.', 1)[0]
    all_results[key] = process(sp)
    print(f'{key}: {len(all_results[key])}')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)

# build collage of source vs match for first dungeon to verify
key = 'foaming-bireysel-cokzor'
items = all_results[key]
src = Image.open(f'{DROP_DIR}/{key}.png').convert('RGB')
W, H = src.size
g = grid_for(W, H)
sheet = Image.new('RGB', (8 * 80, ((len(items) + 7) // 8) * 80 * 2), (10, 12, 25))
for i, it in enumerate(items):
    rr, cc = divmod(i, 8)
    x = g['x0'] + int(it['col'] * g['step_x'])
    y = g['y0'] + int(it['row'] * g['step_y'])
    cell = src.crop((x, y, x + g['cell_w'], y + g['cell_h'])).resize((76, 76))
    sheet.paste(cell, (cc * 80 + 2, rr * 160 + 2))
    icon = Image.open(f'{ICON_DIR}/{it["iconCode"]}.png').convert('RGBA')
    bg = Image.new('RGBA', icon.size, (28, 24, 30, 255))
    icon = Image.alpha_composite(bg, icon).convert('RGB').resize((76, 76))
    sheet.paste(icon, (cc * 80 + 2, rr * 160 + 80))
sheet.save(f'{DEBUG_DIR}/{key}_compare.png')
print(f'\ncompare saved: {key}_compare.png')
