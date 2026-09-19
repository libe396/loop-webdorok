"""장표 JPG → WebP(1920 · q78) + @960 변환.

소스: docs/archive/{research,plan,make}/*.jpg (Figma PPT export · DS PDF)
출력: public/archive/{chapter}/{id}.webp, {id}@960.webp
사용: python3 scripts/archive-webp.py [chapter ...]   (인자 없으면 전부, 이미 있는 건 건너뜀. -f 로 덮어쓰기)
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / 'docs/archive', ROOT / 'public/archive'
SIZES = [(1920, ''), (960, '@960')]
QUALITY = 78

args = [a for a in sys.argv[1:] if a != '-f']
force = '-f' in sys.argv
chapters = args or ['research', 'plan', 'make']

for ch in chapters:
    files = sorted((SRC / ch).glob('*.jpg'))
    if not files:
        print(f'{ch}: 소스 없음 ({SRC / ch})')
        continue
    (OUT / ch).mkdir(parents=True, exist_ok=True)
    done = 0
    for f in files:
        with Image.open(f) as im:
            im = im.convert('RGB')
            for w, suffix in SIZES:
                dst = OUT / ch / f'{f.stem}{suffix}.webp'
                if dst.exists() and not force:
                    continue
                img = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
                img.save(dst, 'WEBP', quality=QUALITY, method=6)
        done += 1
    print(f'{ch}: {done}장')
