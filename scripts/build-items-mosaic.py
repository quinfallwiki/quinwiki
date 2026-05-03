"""
Build a 16:9 grid mosaic of representative Quinfall item icons for the
homepage 'Items' card. 24 icons (6 cols x 4 rows) on a dark frost-tinted
background. Output: public/assets/quinfall/home-cards/itemler.png
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "public" / "assets" / "icons"
OUT_DIR = ROOT / "public" / "assets" / "quinfall" / "home-cards"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "itemler.png"

# 24 curated items — weapons (top row), armor (left mid), accessories
# (right mid), tools (bottom). Each name maps to a file in /public/assets/icons/.
PICKS = [
    # row 1 — 6 weapons (high-tier endgame)
    "item_icon1_0_A016", "item_icon1_0_B016", "item_icon1_0_C016",
    "item_icon1_0_D016", "item_icon1_0_E016", "item_icon1_0_F016",
    # row 2 — 5 weapons + 1 staff
    "item_icon1_0_G016", "item_icon1_0_H016", "item_icon1_0_L016",
    "item_icon1_0_J016", "item_icon1_0_K016", "item_icon1_3_1016",
    # row 3 — armor pieces + accessories
    "item_icon1_3_2016", "item_icon1_3_3016", "item_icon1_3_4016",
    "item_icon1_0_1001", "item_icon1_0_2001", "item_icon1_0_3001",
    # row 4 — accessory + tools (gathering kit)
    "item_icon1_0_4001", "item_icon1_0_5001",
    "item_icon1_0_6001", "item_icon1_0_6101",
    "item_icon1_0_6201", "item_icon1_0_6301",
]

# Canvas
W, H = 1200, 675
COLS, ROWS = 6, 4
PAD_X, PAD_Y = 60, 50
GAP = 16
CELL = (W - 2 * PAD_X - GAP * (COLS - 1)) // COLS  # ~170 px
ICON = int(CELL * 0.78)


def make_background() -> Image.Image:
    bg = Image.new("RGB", (W, H), (5, 8, 16))
    px = bg.load()
    # Top→bottom slight gradient + frost diagonal glow
    for y in range(H):
        t = y / H
        for x in range(W):
            r = int(8 + 8 * (1 - t))
            g = int(12 + 14 * (1 - t))
            b = int(24 + 18 * (1 - t))
            px[x, y] = (r, g, b)

    # Soft frost-blue radial in upper-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W - 460, -180, W + 180, 320), fill=(70, 130, 220, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    bg = Image.alpha_composite(bg.convert("RGBA"), glow).convert("RGB")

    # Subtle dot grid
    dot_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dot_layer)
    step = 32
    for y in range(0, H, step):
        for x in range(0, W, step):
            dd.ellipse((x - 1, y - 1, x + 1, y + 1), fill=(120, 170, 220, 28))
    bg = Image.alpha_composite(bg.convert("RGBA"), dot_layer).convert("RGB")
    return bg


def make_cell(icon_path: Path, size: int) -> Image.Image:
    """Single tile: rounded dark square + frost border + the icon centered."""
    cell = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cd = ImageDraw.Draw(cell)

    # Rounded backplate
    cd.rounded_rectangle((0, 0, size - 1, size - 1), radius=18,
                         fill=(11, 17, 30, 230),
                         outline=(126, 196, 255, 90), width=1)

    # Inner highlight
    cd.rounded_rectangle((2, 2, size - 3, size - 3), radius=16,
                         outline=(126, 196, 255, 30), width=1)

    if icon_path.exists():
        try:
            icon = Image.open(icon_path).convert("RGBA")
            icon = icon.resize((ICON, ICON), Image.LANCZOS)
            offset = ((size - ICON) // 2, (size - ICON) // 2)
            cell.alpha_composite(icon, dest=offset)
        except Exception as exc:
            print(f"  ! could not load {icon_path.name}: {exc}")
    else:
        print(f"  ! missing {icon_path.name}")

    return cell


def build():
    canvas = make_background().convert("RGBA")

    for idx, slug in enumerate(PICKS):
        if idx >= COLS * ROWS:
            break
        col, row = idx % COLS, idx // COLS
        x = PAD_X + col * (CELL + GAP)
        y = PAD_Y + row * (CELL + GAP)
        cell = make_cell(ICONS / f"{slug}.png", CELL)
        canvas.alpha_composite(cell, dest=(x, y))

    # Soft outer vignette so the corners blend with the rest of the page card
    vignette = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vignette)
    vd.rounded_rectangle((20, 20, W - 20, H - 20), radius=40, fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(40))
    final_bg = Image.new("RGB", (W, H), (5, 7, 13))
    final_bg.paste(canvas.convert("RGB"), mask=vignette)

    final_bg.save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
