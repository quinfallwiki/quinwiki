"""
Build a 16:9 homepage card for the Studio (Vawraek) section.
Dark background + frost glow + the Vawraek logo centered.
Output: public/assets/quinfall/home-cards/vawraek.png
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "public" / "assets" / "vawraek" / "vawraek-logo.png"
OUT_DIR = ROOT / "public" / "assets" / "quinfall" / "home-cards"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "vawraek.png"

W, H = 1200, 675


def build():
    bg = Image.new("RGB", (W, H), (5, 8, 16))
    px = bg.load()
    # Diagonal subtle gradient
    for y in range(H):
        for x in range(W):
            t = (x / W + y / H) / 2
            r = int(8 + 14 * (1 - t))
            g = int(12 + 16 * (1 - t))
            b = int(28 + 22 * (1 - t))
            px[x, y] = (r, g, b)
    bg = bg.convert("RGBA")

    # Frost-purple radial glow centered behind logo
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W // 2 - 320, H // 2 - 240, W // 2 + 320, H // 2 + 240),
               fill=(126, 196, 255, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    bg = Image.alpha_composite(bg, glow)

    # Secondary ember corner glow (top-right)
    ember = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ed = ImageDraw.Draw(ember)
    ed.ellipse((W - 380, -200, W + 200, 320), fill=(220, 130, 70, 40))
    ember = ember.filter(ImageFilter.GaussianBlur(110))
    bg = Image.alpha_composite(bg, ember)

    # Subtle dot grid
    dots = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dots)
    for y in range(0, H, 36):
        for x in range(0, W, 36):
            dd.ellipse((x - 1, y - 1, x + 1, y + 1), fill=(140, 180, 230, 24))
    bg = Image.alpha_composite(bg, dots)

    # Logo
    if not LOGO.exists():
        raise FileNotFoundError(LOGO)
    logo = Image.open(LOGO).convert("RGBA")
    target_h = int(H * 0.55)
    ratio = target_h / logo.height
    logo = logo.resize((int(logo.width * ratio), target_h), Image.LANCZOS)

    # Add a soft outer glow around logo by pasting a blurred white version below
    aura = Image.new("RGBA", logo.size, (0, 0, 0, 0))
    ad = ImageDraw.Draw(aura)
    ad.bitmap((0, 0), logo.split()[3], fill=(126, 196, 255, 200))
    aura = aura.filter(ImageFilter.GaussianBlur(20))
    aura_pos = ((W - aura.width) // 2, (H - aura.height) // 2)
    bg.alpha_composite(aura, dest=aura_pos)

    pos = ((W - logo.width) // 2, (H - logo.height) // 2)
    bg.alpha_composite(logo, dest=pos)

    bg.convert("RGB").save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
