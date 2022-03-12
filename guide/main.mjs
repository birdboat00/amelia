import { gse } from "./sketches/gettingstarted.mjs";
import { sharc } from "./sketches/shapes-arc.mjs";
import { shcircle } from "./sketches/shapes-circle.mjs";
import { shline } from "./sketches/shapes-line.mjs";
import { shpbmb } from "./sketches/shapes-pb-mandelbrot.mjs";
import { shpoly } from "./sketches/shapes-poly.mjs";
import { shpts } from "./sketches/shapes-pts.mjs";
import { shquad } from "./sketches/shapes-quad.mjs";
import { shrect } from "./sketches/shapes-rect.mjs";
import { shtext } from "./sketches/shapes-text.mjs";
import { shtri } from "./sketches/shapes-tri.mjs";
fetch("./guide-content.md")
    .then(res => res.text())
    .then(text => {
        document.getElementById("content").innerHTML
            = marked.parse(text, {
                highlight: (code, lang) => {
                    const l = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language: l }).value;
                },
                langPrefix: "hljs language-"
            });

        gse();
        shrect();
        shcircle();
        shquad();
        shline();
        sharc();
        shtri();
        shpts();
        shpoly();
        shtext();
        shpbmb();
    });