# -*- coding: utf-8 -*-
# Render the Operations Manual v2.0 markdown to PDF (same recipe as aoc-v2/_build_pdf.py)
import os, html
import matplotlib, markdown
from xhtml2pdf import pisa
from xhtml2pdf.default import DEFAULT_FONT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLTTFont

BASE = r"C:\Users\KMEAR\Desktop\DSS content\oursharedgifts-deploy"
SRC = os.path.join(BASE, "library", "operations-manual-field-edition.md")
OUT = os.path.join(BASE, "library", "operations-manual-field-edition.pdf")
TTF = os.path.join(os.path.dirname(matplotlib.__file__), "mpl-data", "fonts", "ttf").replace("\\", "/")

pdfmetrics.registerFont(RLTTFont("DV", os.path.join(TTF, "DejaVuSans.ttf")))
pdfmetrics.registerFont(RLTTFont("DVb", os.path.join(TTF, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(RLTTFont("DVi", os.path.join(TTF, "DejaVuSans-Oblique.ttf")))
pdfmetrics.registerFont(RLTTFont("DVbi", os.path.join(TTF, "DejaVuSans-BoldOblique.ttf")))
pdfmetrics.registerFont(RLTTFont("DVM", os.path.join(TTF, "DejaVuSansMono.ttf")))
pdfmetrics.registerFontFamily("DV", normal="DV", bold="DVb", italic="DVi", boldItalic="DVbi")
DEFAULT_FONT["dv"] = "DV"
DEFAULT_FONT["dvm"] = "DVM"

with open(SRC, encoding="utf-8") as f:
    src = f.read()

# drop the md H1/H2/byline block; the PDF cover replaces it
body_md = src.split("---", 1)[1]

MD_EXT = ["tables", "fenced_code", "sane_lists", "attr_list"]
body = markdown.markdown(body_md, extensions=MD_EXT)

cover = """
<div class="cover">
  <div class="sig">4 &middot; 6 &middot; 4 &middot; 1</div>
  <h1 class="ctitle">Operations Manual</h1>
  <div class="csub">How to Run Recognition Infrastructure on Your Own Substrate<br/>Field Edition</div>
  <div class="cver">Version 2.0 &middot; Conforms to Invariant v2.0</div>
  <div class="cmeta">Kevin Mears &middot; June 2026</div>
  <div class="cnote">Use freely. Adapt as needed. Recognition welcomed, not required. Utility proves value.<br/>
  The Gift is the persistence of the pattern.</div>
</div>
<div style="page-break-before: always;"></div>
"""

CSS = """
@page { size: A4 portrait; margin: 1.8cm 1.7cm 2.0cm 1.7cm;
  @frame footer { -pdf-frame-content: footerc; bottom: 0.9cm; margin-left: 1.7cm; margin-right: 1.7cm; height: 1cm; } }
body { font-family: 'DV'; font-size: 9.5pt; line-height: 1.42; color: #1a1a1a; }
h1 { font-size: 16pt; margin: 1.0em 0 0.4em; color: #111; border-bottom: 1.2pt solid #8a6d1a; padding-bottom: 3pt; }
h2 { font-size: 12.5pt; margin: 1.1em 0 0.4em; color: #111; border-bottom: 0.6pt solid #bbb; padding-bottom: 2pt; }
h3 { font-size: 10.5pt; margin: 0.9em 0 0.3em; color: #8a6d1a; }
h4 { font-size: 9.8pt; margin: 0.7em 0 0.2em; color: #333; }
p { margin: 0.35em 0; }
ul, ol { margin: 0.3em 0 0.3em 0; padding-left: 1.1em; }
li { margin: 0.12em 0; }
code { font-family: 'DVM'; font-size: 8.4pt; background: #f2f2f2; }
table { border-collapse: collapse; width: 100%; margin: 0.5em 0; font-size: 8.2pt; }
th, td { border: 0.5pt solid #999; padding: 3pt 4pt; text-align: left; vertical-align: top; }
th { background: #ececec; font-weight: bold; }
blockquote { color: #444; border-left: 2pt solid #ccc; margin: 0.4em 0; padding: 0.1em 0.8em; font-style: italic; }
hr { border: none; border-top: 0.5pt solid #ccc; margin: 0.8em 0; }
a { color: #1a1a1a; text-decoration: none; }
.cover { text-align: center; padding-top: 5.5cm; }
.sig { font-size: 15pt; letter-spacing: 4pt; color: #8a6d1a; margin-bottom: 1.4cm; }
.ctitle { font-size: 25pt; margin: 0; border: none; }
.csub { font-size: 11.5pt; color: #444; margin: 0.5cm 0 0; }
.cver { font-size: 12pt; color: #8a6d1a; margin-top: 1.3cm; font-weight: bold; }
.cmeta { font-size: 9.5pt; color: #555; margin-top: 0.5cm; }
.cnote { font-size: 9.5pt; color: #666; margin-top: 2.6cm; font-style: italic; }
#footerc { font-size: 7.5pt; color: #999; text-align: center; }
"""

DOC = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>{CSS}</style></head>
<body>
<div id="footerc">Operations Manual &mdash; Field Edition v2.0 &middot; 4 &middot; 6 &middot; 4 &middot; 1 &middot; <pdf:pagenumber> / <pdf:pagecount></div>
{cover}
{body}
</body></html>"""

def link_callback(uri, rel):
    base = os.path.basename(uri)
    cand = os.path.join(TTF, base)
    if os.path.isfile(cand):
        return cand
    return uri

with open(OUT, "wb") as f:
    res = pisa.CreatePDF(DOC, dest=f, encoding="utf-8", link_callback=link_callback)
print("ERR" if res.err else "OK", "->", OUT)
