"""v4: pHash matching — much more forgiving of background/scale differences."""
import os, json, glob
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
import imagehash

ROOT = r'C:/Users/tr/Desktop/QuinWiki'
ICON_DIR = f'{ROOT}/public/assets/icons'
DROP_DIR = f'{ROOT}/public/assets/quinfall/dungeons'
OUT = f'{ROOT}/.tmp/drops_matched_v4.json'
DEBUG_DIR = f'{ROOT}/.tmp/match_debug_v4'
os.makedirs(DEBUG_DIR, exist_ok=True)


def grid_for(W, H):
    sx, sy = W / 433, H / 257
    return {
        'x0': int(14 * sx), 'step_x': 48 * sx, 'cell_w': int(46 * sx),
        'y0': int(96 * sy), 'step_y': 60 * sy, 'cell_h': int(46 * sy),
    }


def prep_icon_for_hash(path):
    """Crop to alpha bbox, composite on dark, square pad, return PIL RGB."""
    im = Image.open(path)
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if bbox:
        im = im.crop(bbox)
    bg = Image.new('RGBA', im.size, (28, 24, 30, 255))
    composed = Image.alpha_composite(bg, im).convert('RGB')
    w, h = composed.size
    side = max(w, h)
    sq = Image.new('RGB', (side, side), (28, 24, 30))
    sq.paste(composed, ((side - w) // 2, (side - h) // 2))
    return sq


def prep_cell_for_hash(cell_img, cw, ch):
    """Skip the top-left badge area, square-pad, return PIL RGB."""
    inner = cell_img.crop((3, 3, cw - 3, ch - 3))
    iw, ih = inner.size
    arr = np.array(inner).copy()
    bg_color = arr[ih // 2:, iw // 2:, :].mean(axis=(0, 1)).astype(np.uint8)
    arr[:13, :13, :] = bg_color
    inner_clean = Image.fromarray(arr)
    side = max(iw, ih)
    sq = Image.new('RGB', (side, side), tuple(bg_color))
    sq.paste(inner_clean, ((side - iw) // 2, (side - ih) // 2))
    return sq


def cell_score(cell_img, cw, ch):
    center = cell_img.crop((6, 6, cw - 6, ch - 6))
    arr = np.array(center)
    return float(arr.std() + arr.max() * 0.1)


print('hashing icons...')
HASHES = {}  # code -> (phash, dhash, ahash)
for fp in glob.glob(f'{ICON_DIR}/*.png'):
    code = os.path.basename(fp).rsplit('.', 1)[0]
    try:
        im = prep_icon_for_hash(fp)
        # use combined phash (more spatial) + dhash (gradient)
        ph = imagehash.phash(im, hash_size=16)
        dh = imagehash.dhash(im, hash_size=16)
        HASHES[code] = (ph, dh)
    except Exception:
        pass
ICON_CODES = list(HASHES.keys())
print(f'hashed {len(ICON_CODES)} icons')


def match_cell(cell_img, cw, ch):
    prep = prep_cell_for_hash(cell_img, cw, ch)
    ph = imagehash.phash(prep, hash_size=16)
    dh = imagehash.dhash(prep, hash_size=16)
    best = None; best_d = 999
    for code, (iph, idh) in HASHES.items():
        d = (ph - iph) + (dh - idh)  # combined hamming distance
        if d < best_d:
            best_d = d; best = code
    return best, best_d


def process(path):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    g = grid_for(W, H)
    name = os.path.basename(path).rsplit('.', 1)[0]
    results = []
    for r in range(5):
        for c in range(8):
            x = g['x0'] + int(c * g['step_x'])
            y = g['y0'] + int(r * g['step_y'])
            if y + g['cell_h'] > H + 4:
                continue
            cell = im.crop((x, y, x + g['cell_w'], y + g['cell_h']))
            s = cell_score(cell, g['cell_w'], g['cell_h'])
            if s < 30:
                continue
            code, d = match_cell(cell, g['cell_w'], g['cell_h'])
            results.append({'row': r, 'col': c, 'iconCode': code, 'dist': d})
    return results


all_results = {}
for sp in sorted(glob.glob(f'{DROP_DIR}/*.png')):
    key = os.path.basename(sp).rsplit('.', 1)[0]
    all_results[key] = process(sp)
    print(f'{key}: {len(all_results[key])}')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)

# build comparison collage for foaming-cokzor
key = 'foaming-bireysel-cokzor'
items = all_results[key]
src = Image.open(f'{DROP_DIR}/{key}.png').convert('RGB')
W, H = src.size
g = grid_for(W, H)
cols = 8
rows = (len(items) + cols - 1) // cols
sheet = Image.new('RGB', (cols * 80, rows * 160), (10, 12, 25))
for i, it in enumerate(items):
    rr, cc = divmod(i, cols)
    x = g['x0'] + int(it['col'] * g['step_x'])
    y = g['y0'] + int(it['row'] * g['step_y'])
    cell = src.crop((x, y, x + g['cell_w'], y + g['cell_h'])).resize((76, 76))
    sheet.paste(cell, (cc * 80 + 2, rr * 160 + 2))
    icon_path = f'{ICON_DIR}/{it["iconCode"]}.png'
    icon = Image.open(icon_path).convert('RGBA')
    bg = Image.new('RGBA', icon.size, (28, 24, 30, 255))
    icon = Image.alpha_composite(bg, icon).convert('RGB').resize((76, 76))
    sheet.paste(icon, (cc * 80 + 2, rr * 160 + 80))
sheet.save(f'{DEBUG_DIR}/{key}_compare.png')
