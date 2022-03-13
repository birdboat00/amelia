export function loadContent(contentFileName, onLoadedFn) {
    fetch(contentFileName)
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

            if (onLoadedFn) onLoadedFn();
        });
}