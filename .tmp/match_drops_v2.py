"""v2: better empty detection (std + max), 5-row scan, save side-by-side debug."""
import os, json, glob
from PIL import Image, ImageDraw
import numpy as np

ROOT = r'C:/Users/tr/Desktop/QuinWiki'
ICON_DIR = f'{ROOT}/public/assets/icons'
DROP_DIR = f'{ROOT}/public/assets/quinfall/dungeons'
OUT = f'{ROOT}/.tmp/drops_matched_v2.json'
DEBUG_DIR = f'{ROOT}/.tmp/match_debug_v2'
os.makedirs(DEBUG_DIR, exist_ok=True)

ICON_SIZE = 32
EMPTY_SCORE_THRESHOLD = 30  # std + max*0.1 below this = empty cell

def grid_for(W, H):
    sx, sy = W / 433, H / 257
    return {
        'x0': int(14 * sx),
        'step_x': 48 * sx,
        'cell_w': int(46 * sx),
        'y0': int(96 * sy),
        'step_y': 60 * sy,
        'cell_h': int(46 * sy),
    }

def load_icons():
    icons = {}
    for fp in glob.glob(f'{ICON_DIR}/*.png'):
        try:
            im = Image.open(fp).convert('RGB').resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS)
            code = os.path.basename(fp).rsplit('.', 1)[0]
            icons[code] = np.array(im, dtype=np.float32)
        except Exception:
            pass
    return icons

print('loading icons...')
ICONS = load_icons()
ICON_CODES = list(ICONS.keys())
ICON_STACK = np.stack([ICONS[c] for c in ICON_CODES])
print(f'loaded {len(ICONS)} icons')

def cell_score(cell_img, cw, ch):
    """High score = likely an item, low = empty."""
    center = cell_img.crop((6, 6, cw - 6, ch - 6))
    arr = np.array(center)
    return float(arr.std() + arr.max() * 0.1)

def match_icon(cell_img):
    arr = np.array(cell_img.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS), dtype=np.float32)
    diff = ICON_STACK - arr
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
                dr.rectangle([x, y, x + g['cell_w'], y + g['cell_h']], outline=(180, 30, 30), width=1)
                continue
            code, mse = match_icon(cell)
            results.append({
                'row': r, 'col': c,
                'iconCode': code,
                'mse': round(mse, 1),
            })
            dr.rectangle([x, y, x + g['cell_w'], y + g['cell_h']], outline=(60, 200, 60), width=2)
    debug_im.save(f'{DEBUG_DIR}/{name}_grid.png')
    return results

# Process all
all_results = {}
for sp in sorted(glob.glob(f'{DROP_DIR}/*.png')):
    key = os.path.basename(sp).rsplit('.', 1)[0]
    all_results[key] = process(sp)
    print(f'{key}: {len(all_results[key])} matched')

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)

# build per-screenshot icon collage for visual review
for key, items in all_results.items():
    if not items:
        continue
    n = len(items)
    cols = 8
    rows = (n + cols - 1) // cols
    sheet = Image.new('RGB', (cols * 36, rows * 36), (10, 12, 25))
    for i, it in enumerate(items):
        ic = Image.open(f'{ICON_DIR}/{it["iconCode"]}.png').convert('RGB').resize((34, 34))
        rr, cc = divmod(i, cols)
        sheet.paste(ic, (cc * 36 + 1, rr * 36 + 1))
    sheet.save(f'{DEBUG_DIR}/{key}_icons.png')

print(f'\ntotal cells: {sum(len(v) for v in all_results.values())}')
print(f'output: {OUT}')
