"""리서치·기획 PDF → 장표 JPG (docs/archive/{research,plan}/).

Loop_Research.pdf 페이지 구성: 1 표지 · 2–135 research r001–r134 · 136–166 plan p001–p031 · 167 End Of Document
폭 1920으로 렌더(원본이 더 크면 축소, 비율 유지). 그다음 scripts/archive-webp.py 로 WebP 변환.
사용: pip install pymupdf pillow && python3 scripts/archive-from-pdf.py ~/Desktop/Loop_Research.pdf
"""
import sys
from pathlib import Path
import fitz  # pymupdf

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'docs/archive'
WIDTH = 1920
RANGES = [('research', 'r', 2, 135), ('plan', 'p', 136, 166)]  # (챕터, 접두사, 시작 페이지, 끝 페이지) — 1부터

doc = fitz.open(sys.argv[1])
assert doc.page_count == 167, f'페이지 수가 다름: {doc.page_count} (매핑 확인 필요)'
for ch, prefix, start, end in RANGES:
    (OUT / ch).mkdir(parents=True, exist_ok=True)
    for n, page_no in enumerate(range(start, end + 1), 1):
        page = doc[page_no - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(WIDTH / page.rect.width, WIDTH / page.rect.width), alpha=False)
        pix.save(OUT / ch / f'{prefix}{n:03d}.jpg', jpg_quality=92)
    print(f'{ch}: {end - start + 1}장')
