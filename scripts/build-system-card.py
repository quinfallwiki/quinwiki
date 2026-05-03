"""
Build a 16:9 homepage card for the System & Performance section.
A stylised motherboard-style chip in the center, frost grid background,
performance bar graph on the right — all themed around hardware.
Output: public/assets/quinfall/home-cards/sistem.png
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "assets" / "quinfall" / "home-cards"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT = OUT_DIR / "sistem.png"

W, H = 1200, 675

FROST = (126, 196, 255)  # primary cyan-blue
EMBER = (220, 130, 70)


def gradient_bg() -> Image.Image:
    bg = Image.new("RGB", (W, H), (5, 7, 13))
    px = bg.load()
    for y in range(H):
        for x in range(W):
            t = (x / W * 0.5 + y / H * 0.5)
            r = int(6 + 10 * (1 - t))
            g = int(10 + 14 * (1 - t))
            b = int(22 + 24 * (1 - t))
            px[x, y] = (r, g, b)
    return bg.convert("RGBA")


def add_grid(bg: Image.Image, step: int = 48, alpha: int = 32) -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for x in range(0, W, step):
        d.line([(x, 0), (x, H)], fill=(*FROST, alpha), width=1)
    for y in range(0, H, step):
        d.line([(0, y), (W, y)], fill=(*FROST, alpha), width=1)
    # mask the grid so it fades out toward the corners
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((-200, -200, W + 200, H + 200), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(120))
    layer.putalpha(Image.eval(mask, lambda v: v * 220 // 255))
    return Image.alpha_composite(bg, layer)


def add_radial_glow(bg: Image.Image, cx: int, cy: int, color: tuple, radius: int, alpha: int) -> Image.Image:
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(*color, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    return Image.alpha_composite(bg, glow)


def draw_chip(bg: Image.Image, cx: int, cy: int, size: int) -> Image.Image:
    """Stylised CPU/chip with pins on all four sides + central die."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)

    half = size // 2
    # Outer chip body (substrate)
    d.rounded_rectangle(
        (cx - half, cy - half, cx + half, cy + half),
        radius=12,
        fill=(14, 22, 38, 255),
        outline=(*FROST, 200),
        width=2,
    )

    # Inner die
    inset = size // 5
    die_box = (cx - half + inset, cy - half + inset, cx + half - inset, cy + half - inset)
    d.rounded_rectangle(die_box, radius=8, fill=(20, 32, 56, 255), outline=(*FROST, 150), width=1)

    # Inner inner — bright die surface
    inset2 = size // 3
    inner_box = (cx - half + inset2, cy - half + inset2, cx + half - inset2, cy + half - inset2)
    d.rounded_rectangle(inner_box, radius=6, fill=(40, 80, 140, 255), outline=(*FROST, 230), width=1)

    # Tiny etched circuitry on die
    for offset in range(-30, 31, 12):
        d.line([(cx - half + inset2 + 4, cy + offset), (cx + half - inset2 - 4, cy + offset)],
               fill=(*FROST, 90), width=1)

    # Center label dot (CPU brand mark)
    d.ellipse((cx - 8, cy - 8, cx + 8, cy + 8), fill=(*FROST, 255))
    d.ellipse((cx - 4, cy - 4, cx + 4, cy + 4), fill=(255, 255, 255, 230))

    # Pins around all four sides
    pin_count = 12
    pin_w, pin_l = 3, 18
    spacing = size / (pin_count + 1)
    for i in range(1, pin_count + 1):
        offset = -half + spacing * i
        # top
        d.rounded_rectangle((cx + offset - pin_w, cy - half - pin_l, cx + offset + pin_w, cy - half),
                            radius=2, fill=(*FROST, 160))
        # bottom
        d.rounded_rectangle((cx + offset - pin_w, cy + half, cx + offset + pin_w, cy + half + pin_l),
                            radius=2, fill=(*FROST, 160))
        # left
        d.rounded_rectangle((cx - half - pin_l, cy + offset - pin_w, cx - half, cy + offset + pin_w),
                            radius=2, fill=(*FROST, 160))
        # right
        d.rounded_rectangle((cx + half, cy + offset - pin_w, cx + half + pin_l, cy + offset + pin_w),
                            radius=2, fill=(*FROST, 160))

    # Glow under chip
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((cx - size, cy - size, cx + size, cy + size), fill=(*FROST, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    bg = Image.alpha_composite(bg, glow)
    return Image.alpha_composite(bg, layer)


def draw_perf_bars(bg: Image.Image, x: int, y: int, w: int, h: int) -> Image.Image:
    """Vertical performance bars (60 / 90 / 120 / 144 fps style)."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    bars = [0.40, 0.65, 0.85, 1.00]
    bar_w = (w - 6 * (len(bars) - 1)) // len(bars)
    for i, v in enumerate(bars):
        bx = x + i * (bar_w + 6)
        bh = int(h * v)
        # Track
        d.rounded_rectangle((bx, y, bx + bar_w, y + h),
                            radius=4, fill=(20, 30, 50, 200))
        # Fill — tint shifts from frost (low) to ember (high)
        c = (
            int(FROST[0] + (EMBER[0] - FROST[0]) * v),
            int(FROST[1] + (EMBER[1] - FROST[1]) * v),
            int(FROST[2] + (EMBER[2] - FROST[2]) * v),
        )
        d.rounded_rectangle((bx, y + h - bh, bx + bar_w, y + h),
                            radius=4, fill=(*c, 230))
    return Image.alpha_composite(bg, layer)


def draw_waveform(bg: Image.Image, x: int, y: int, w: int, h: int) -> Image.Image:
    """A sine-like FPS waveform line above the bars."""
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pts = []
    for px in range(0, w, 4):
        t = px / w * math.pi * 4
        py = y + h // 2 + int(math.sin(t) * (h // 2 - 4) * (0.6 + 0.4 * math.cos(t / 2)))
        pts.append((x + px, py))
    if len(pts) >= 2:
        d.line(pts, fill=(*FROST, 220), width=2)
    return Image.alpha_composite(bg, layer)


def build():
    bg = gradient_bg()
    bg = add_grid(bg)
    bg = add_radial_glow(bg, W // 2 - 60, H // 2, FROST, radius=380, alpha=80)
    bg = add_radial_glow(bg, W - 120, H - 120, EMBER, radius=260, alpha=50)

    # Center the chip slightly left-of-center to make room for the perf bars
    chip_size = 280
    chip_cx = int(W * 0.38)
    chip_cy = H // 2
    bg = draw_chip(bg, chip_cx, chip_cy, chip_size)

    # Perf bars — right side
    bars_x = int(W * 0.66)
    bars_y = int(H * 0.40)
    bars_w = int(W * 0.22)
    bars_h = int(H * 0.32)
    bg = draw_waveform(bg, bars_x, bars_y - 80, bars_w, 60)
    bg = draw_perf_bars(bg, bars_x, bars_y, bars_w, bars_h)

    # Outer vignette so card edges blend
    vignette = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vignette)
    vd.rounded_rectangle((20, 20, W - 20, H - 20), radius=40, fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(36))
    final = Image.new("RGB", (W, H), (5, 7, 13))
    final.paste(bg.convert("RGB"), mask=vignette)

    final.save(OUT, format="PNG", optimize=True)
    print(f"wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
