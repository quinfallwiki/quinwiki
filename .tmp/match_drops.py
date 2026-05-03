"""
Template-match each drop-screenshot cell against the 2158 game icons.
Output: JSON mapping dungeon+mode -> [{slot, iconCode, score, badgeNumber?}]
"""
import os, json, glob, re
from PIL import Image
import numpy as np
import cv2

ROOT = r'C:/Users/tr/Desktop/QuinWiki'
ICON_DIR = f'{ROOT}/public/assets/icons'
DROP_DIR = f'{ROOT}/public/assets/quinfall/dungeons'
OUT = f'{ROOT}/.tmp/drops_matched.json'
DEBUG_DIR = f'{ROOT}/.tmp/match_debug'
os.makedirs(DEBUG_DIR, exist_ok=True)

# Grid params, tuned to foaming-bireysel-cokzor (433x257)
# but screenshots may have slightly different dims; we'll handle dynamically
def grid_for(im_w, im_h):
    # Reference: 433x257 -> x0=14, step_x=48, cell=46, y0=96, step_y=60
    # Scale linearly
    sx = im_w / 433
    sy = im_h / 257
    return {
        'x0': int(14 * sx),
        'step_x': 48 * sx,
        'cell_w': int(46 * sx),
        'y0': int(96 * sy),
        'step_y': 60 * sy,
        'cell_h': int(46 * sy),
        'cols': 8,
        'rows': 4,
    }

# Load all candidate icons once into memory at 32x32
ICON_SIZE = 32

def load_icons():
    icons = {}
    files = glob.glob(f'{ICON_DIR}/*.png')
    print(f'loading {len(files)} icons...')
    for fp in files:
        try:
            im = Image.open(fp).convert('RGB').resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS)
            arr = np.array(im, dtype=np.float32)
            code = os.path.basename(fp).rsplit('.', 1)[0]
            icons[code] = arr
        except Exception as e:
            print(f'skip {fp}: {e}')
    print(f'loaded {len(icons)} icons')
    return icons

ICONS = load_icons()
ICON_CODES = list(ICONS.keys())
ICON_STACK = np.stack([ICONS[c] for c in ICON_CODES])  # (N, 32, 32, 3)

def match_cell(cell_img, slot_id, debug=False):
    """Return (best_code, score) by computing MSE against all icons."""
    # cell_img is PIL RGB; we need to crop to inner item area (skip border)
    # The cells have a slight inner gold border - the actual icon fills most of the cell
    # Resize to 32x32 for comparison
    arr = np.array(cell_img.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS), dtype=np.float32)
    # MSE per icon
    diff = ICON_STACK - arr  # broadcasting
    mse = np.mean(diff**2, axis=(1,2,3))
    best_idx = int(np.argmin(mse))
    best_code = ICON_CODES[best_idx]
    best_score = float(mse[best_idx])
    if debug:
        # save side-by-side
        side = Image.new('RGB', (ICON_SIZE*2 + 4, ICON_SIZE), (0,0,0))
        side.paste(cell_img.resize((ICON_SIZE, ICON_SIZE)), (0,0))
        side.paste(Image.fromarray(ICONS[best_code].astype(np.uint8)), (ICON_SIZE+4, 0))
        side.save(f'{DEBUG_DIR}/{slot_id}_{best_code}_{int(best_score)}.png')
    return best_code, best_score

def is_empty_cell(cell_img, brightness_threshold=22):
    arr = np.array(cell_img)
    return float(arr.mean()) < brightness_threshold

def process_screenshot(path):
    im = Image.open(path).convert('RGB')
    W, H = im.size
    g = grid_for(W, H)
    name = os.path.basename(path).rsplit('.', 1)[0]
    print(f'\n--- {name} ({W}x{H}) ---')
    results = []
    for r in range(g['rows']):
        for c in range(g['cols']):
            x = g['x0'] + int(c * g['step_x'])
            y = g['y0'] + int(r * g['step_y'])
            if y + g['cell_h'] > H:
                continue
            cell = im.crop((x, y, x + g['cell_w'], y + g['cell_h']))
            if is_empty_cell(cell):
                continue
            slot = f'{name}_r{r}c{c}'
            code, score = match_cell(cell, slot, debug=False)
            results.append({
                'row': r, 'col': c,
                'iconCode': code,
                'score': round(score, 1),
            })
    print(f'matched {len(results)} cells')
    return results

# Process all 20 screenshots
all_results = {}
for sp in sorted(glob.glob(f'{DROP_DIR}/*.png')):
    key = os.path.basename(sp).rsplit('.', 1)[0]
    all_results[key] = process_screenshot(sp)

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(all_results, f, indent=2, ensure_ascii=False)
print(f'\nsaved {OUT}')

# print summary
total_cells = sum(len(v) for v in all_results.values())
print(f'total matched cells: {total_cells}')
