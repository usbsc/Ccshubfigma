#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
LOGO_DIR=public/logos
OUT_DIR=public/logos/resized
mkdir -p "$OUT_DIR"

# check for ImageMagick 'convert'
if command -v convert >/dev/null 2>&1; then
  echo "Using ImageMagick to resize logos"
  find "$LOGO_DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' \) -print0 | while IFS= read -r -d '' f; do
    base=$(basename "$f")
    # create banner-safe (1200x400, center, preserve aspect)
    convert "$f" -resize 1200x400^ -gravity center -extent 1200x400 -background none "$OUT_DIR/banner-${base}"
    convert "$f" -resize 400x400^ -gravity center -extent 400x400 -background none "$OUT_DIR/medium-${base}"
    convert "$f" -resize 64x64^ -gravity center -extent 64x64 -background none "$OUT_DIR/small-${base}"
  done
  echo "Resized logos written to $OUT_DIR"
else
  echo "ImageMagick not installed; skipping image resizing. Install imagemagick to enable this step." >&2
  exit 0
fi
