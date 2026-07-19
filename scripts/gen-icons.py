#!/usr/bin/env python3
"""Generate PWA icons for Op naar een Miljoen (Ikigai app).

Produces:
  public/icons/icon-192.png
  public/icons/icon-512.png
  public/icons/icon-maskable-512.png   (content kept inside safe zone)
  public/icons/apple-touch-icon.png    (180x180)
"""
import math
import os
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
os.makedirs(OUT, exist_ok=True)

DARK = (15, 23, 42)        # #0f172a slate-950
AMBER = (245, 158, 11)     # #f59e0b (lambo/amber)
ORANGE = (249, 115, 22)    # #f97316
WHITE = (255, 255, 255)
RADIUS_RATIO = 0.22        # rounded-corner ratio


def rounded_bg(size, bg=DARK):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(size * RADIUS_RATIO)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=bg)
    return img


def radial_glow(size, color, center_ratio=0.5, max_alpha=120, radius_ratio=0.42):
    """Soft radial glow used as a backdrop behind the compass."""
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx = cy = size * center_ratio
    rad = size * radius_ratio
    steps = 60
    for i in range(steps, 0, -1):
        t = i / steps
        a = int(max_alpha * (1 - t))
        gd.ellipse(
            [cx - rad * t, cy - rad * t, cx + rad * t, cy + rad * t],
            fill=(color[0], color[1], color[2], a),
        )
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.04))
    return glow


def compass_star(size, color=WHITE, thickness=None):
    """Draw a 4-point compass rose (N/E/S/W) centered on a transparent canvas."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = size / 2
    arm = size * 0.30          # length of each point from center
    half = size * 0.085        # half-width at the base (gives the diamond look)
    if thickness is None:
        thickness = max(2, int(size * 0.012))
    # Four diamonds: N, E, S, W
    pts = {
        "N": [(cx, cy - arm), (cx + half, cy), (cx, cy), (cx - half, cy)],
        "S": [(cx, cy + arm), (cx + half, cy), (cx, cy), (cx - half, cy)],
        "E": [(cx + arm, cy), (cx, cy + half), (cx, cy), (cx, cy - half)],
        "W": [(cx - arm, cy), (cx, cy + half), (cx, cy), (cx, cy - half)],
    }
    for p in pts.values():
        d.polygon(p, fill=color)
    # center dot
    r = size * 0.045
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ORANGE)
    return img


def make_icon(size, maskable=False):
    img = rounded_bg(size)
    # amber glow
    img = Image.alpha_composite(img, radial_glow(size, AMBER, radius_ratio=0.46))
    # For maskable, keep all artwork inside the central 80% safe zone.
    if maskable:
        art_size = int(size * 0.80)
        offset = int(size * 0.10)
        star = compass_star(art_size, color=WHITE)
        star = star.resize((art_size, art_size), Image.LANCZOS)
        img.paste(star, (offset, offset), star)
        # ring to make it pop on the dark maskable background
        ring = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        rd = ImageDraw.Draw(ring)
        m = int(size * 0.30)
        rd.ellipse([m, m, size - m, size - m], outline=(AMBER[0], AMBER[1], AMBER[2], 160), width=max(2, int(size * 0.01)))
        img = Image.alpha_composite(img, ring)
    else:
        star = compass_star(size, color=WHITE)
        img = Image.alpha_composite(img, star)
    return img


def save(img, name):
    path = os.path.join(OUT, name)
    img.save(path, "PNG")
    print("wrote", os.path.relpath(path))


if __name__ == "__main__":
    save(make_icon(192), "icon-192.png")
    save(make_icon(512), "icon-512.png")
    save(make_icon(512, maskable=True), "icon-maskable-512.png")
    save(make_icon(180), "apple-touch-icon.png")
    print("done")
