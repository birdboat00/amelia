import { gse } from "./sketches/gettingstarted.mjs";
import { shcircle } from "./sketches/shapes-circle.mjs";
import { shrect } from "./sketches/shapes-rect.mjs";
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
    });