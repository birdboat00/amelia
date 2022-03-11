let textarea;
let previewFrame;
let editor;

const exampleCode = `import { app, Color, Size } from "../module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen.background().color(Color.Plum);

    pen.circle().xy(150, 150).radius(100).color(Color.Amber);
    pen.rect().xy(100, 100).wh(100, 100).color(Color.Cornflower);

    pen.plot();
};

app().size(300, 300).view(view).run();`;

const logToConsole = (msg) => {
    const console = document.getElementById("content");
    let text = document.createElement("p");
    text.innerText = msg;
    console.appendChild(text);
};

document.addEventListener("DOMContentLoaded", () => {

    textarea = document.getElementById("editortext");
    previewFrame = document.getElementById("previewframe");

    editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        mode: "javascript",
        theme: "amelia",
        indentUnit: 4,
        tabSize: 4,
        matchBrackets: true,
        autoCloseBrackets: true,
        showHint: true
    });

    editor.setValue(exampleCode);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.has("source")) {
        const srcUrl = urlParams.get("source");
        fetch(srcUrl)
            .then(res => res.text())
            .then(code => {
                console.log(srcUrl);
                console.log(code);
                editor.setValue(code);
            });
    }

    logToConsole("loaded editor.");
})

function runCode() {
    if(previewFrame && previewFrame.contentWindow) {
        console.log("submitting code");
        console.log(editor.getValue());
        let pfd = previewFrame.contentWindow.document;
        pfd.body.innerHTML = '';
        let script = pfd.createElement("script");
        script.type = "module";
        script.innerHTML = editor.getValue();
        pfd.body.appendChild(script);
    }
}