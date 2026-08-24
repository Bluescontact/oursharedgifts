import sys
from pypdf import PdfReader
src, dst = sys.argv[1], sys.argv[2]
r = PdfReader(src)
text = "\n\n".join(p.extract_text() for p in r.pages)
open(dst, "w", encoding="utf-8").write(text)
print("pages:", len(r.pages), "chars:", len(text))
