let textarea;
let previewFrame;
let editor;

const AppStates = {
    Stopped: 0,
    Running: 1,
    Error: 2
};

let appState;

let setAppState = (state) => {

    appState = state;
    let str = "N / A";
    switch(state) {
        case AppStates.Stopped:
            str = "■ Not running";
            break;
        case AppStates.Running:
            str = "▶ Running";
            break;
        case AppStates.Error:
            str = "⚠ App Error";
            break;
        default:
            str = "N / A";
            break;
    }
    document.getElementById("app-state").textContent = str;
};


const exampleCode = `import { app, Color, Size } from "../module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen.background().color(Color.Plum);

    pen.circle().xy(150, 150).radius(100).color(Color.Amber);
    pen.rect().xy(100, 100).wh(100, 100).color(Color.Cornflower);

    pen.plot();
};

app().quickstart(view, 300, 300);`;

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


    window.addEventListener("message", (ev) => {
        let msg = JSON.parse(ev.data);
        if(msg.cmd == "err") {
            setAppState(AppStates.Error);
        }
    });

    setAppState(AppStates.Stopped);
});

let runningScript;
let previewFrameDocument;

function runCode() {
    stopCode();

    if(previewFrame && previewFrame.contentWindow) {
        previewFrameDocument = previewFrame.contentWindow.document;
        let errScript = previewFrameDocument.createElement("script");
        errScript.innerHTML = `
        window.addEventListener("error", (e) => {
            let errText = document.createElement("p");
            errText.style = "color: #900;";
            errText.innerHTML = e.message + " (line: " + e.lineno + ", column: " + e.colno + ")";
            document.body.appendChild(errText);
            parent.postMessage(JSON.stringify({ cmd: "err", err: e }));
        });
        `;
        previewFrameDocument.body.appendChild(errScript);
        runningScript = previewFrameDocument.createElement("script");
        runningScript.type = "module";
        runningScript.innerHTML = editor.getValue();
        previewFrameDocument.body.appendChild(runningScript);
        setAppState(AppStates.Running);

    }
}

function stopCode() {
    clearCanvas();
    setAppState(AppStates.Stopped);
}

function clearCanvas() {
    if(previewFrame && previewFrame.contentWindow && previewFrameDocument) {
        previewFrameDocument.body.innerHTML = '';
        previewFrame.remove();
    }

    let canvas = document.getElementById("previewframediv");
    previewFrame = document.createElement("iframe");
    previewFrame.id = "previewframe";
    canvas.appendChild(previewFrame);
}