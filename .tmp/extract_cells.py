"""Extract each non-empty drop-screenshot cell as individual PNG.
Output: /public/assets/quinfall/drop-cells/<dungeon>-<mode>/<NN>.png
Plus: /public/assets/quinfall/drop-manifest.json with per-screenshot cell list."""
import os, json, glob, shutil
from PIL import Image
import numpy as np

ROOT = r'C:/Users/tr/Desktop/QuinWiki'
DROP_DIR = f'{ROOT}/public/assets/quinfall/dungeons'
OUT_DIR = f'{ROOT}/public/assets/quinfall/drop-cells'
MANIFEST = f'{ROOT}/public/assets/quinfall/drops-manifest.json'

shutil.rmtree(OUT_DIR, ignore_errors=True)
os.makedirs(OUT_DIR, exist_ok=True)


def grid_for(W, H):
    sx, sy = W / 433, H / 257
    return {
        'x0': int(14 * sx), 'step_x': 48 * sx, 'cell_w': int(46 * sx),
        'y0': int(96 * sy), 'step_y': 60 * sy, 'cell_h': int(46 * sy),
    }


def cell_score(cell_img, cw, ch):
    center = cell_img.crop((6, 6, cw - 6, ch - 6))
    arr = np.array(center)
    return float(arr.std() + arr.max() * 0.1)


def parse_key(name):
    """foaming-bireysel-cokzor -> (foaming, bireysel-cokzor) or (foaming, party)"""
    parts = name.split('-')
    dungeon = parts[0]
    mode = '-'.join(parts[1:])
    return dungeon, mode


manifest = {}
for sp in sorted(glob.glob(f'{DROP_DIR}/*.png')):
    key = os.path.basename(sp).rsplit('.', 1)[0]
    dungeon, mode = parse_key(key)
    sub = f'{OUT_DIR}/{key}'
    os.makedirs(sub, exist_ok=True)

    im = Image.open(sp).convert('RGB')
    W, H = im.size
    g = grid_for(W, H)
    cells = []
    idx = 1
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
            # save with 2-digit index
            fname = f'{idx:02d}.png'
            cell.save(f'{sub}/{fname}', optimize=True)
            cells.append(fname)
            idx += 1
    manifest[key] = cells
    print(f'{key}: {len(cells)} cells')

with open(MANIFEST, 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)
print(f'\nmanifest: {MANIFEST}')
print(f'total cells extracted: {sum(len(v) for v in manifest.values())}')
