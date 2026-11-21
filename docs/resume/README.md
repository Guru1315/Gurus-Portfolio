# Résumé source

`resume.html` is the source of `public/Guru-Charan-Resume.pdf` (the "Download CV" file on the site).
Edit the HTML, then print it to a one-page A4 PDF with headless Chrome:

```bash
chrome --headless=new --no-pdf-header-footer --virtual-time-budget=3000 --print-to-pdf=public/Guru-Charan-Resume.pdf docs/resume/resume.html
```

Images: `photo.png` (headshot), `qr.svg` (links to https://www.gurucharan.me), and site thumbnails
`perfume.jpg`, `lays.jpg`, `movade.jpg` cropped from `public/sites/portfolio/work/`.
