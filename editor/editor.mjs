const exampleCode = `import { app, Color, Size } from "../module/mod.mjs";

const view = (app) => {
    let pen = app.pen();

    pen.background().color(Color.Plum);

    pen.circle().xy(150, 150).radius(100).color(Color.Amber);
    pen.rect().xy(100, 100).wh(100, 100).color(Color.Cornflower);

    pen.plot();
};

app().quickstart(view, 300, 300);`;

const AppStates = {
    Stopped: "■ Not running",
    Running: "▶ Running",
    Error: "⚠ App Error",
    None: "N / A"
};

class AmeliaEditor {
    appState;
    appStateDisplay;
    previewFrame;
    editor;
    editorFrame;
    previewFrameDocument;

    constructor(previewFrameId, codeEditorId, appStateId) {
        this.previewFrame = document.createElement("iframe");
        this.previewFrame.id = "previewframe";
        document.getElementById("previewframediv").appendChild(this.previewFrame);
        this.previewFrameDocument = this.previewFrame.contentWindow.document;
        this.editorFrame = document.getElementById(codeEditorId);
        this.appStateDisplay = document.getElementById(appStateId);

        this.editor = CodeMirror(this.editorFrame, {
            lineNumbers: true,
            mode: "javascript",
            theme: "amelia",
            indentUnit: 4,
            tabSize: 4,
            matchBrackets: true,
            autoCloseBrackets: true
        });

        this.editor.setValue(exampleCode);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (urlParams.has("source")) {
            const srcUrl = urlParams.get("source");
            fetch(srcUrl)
                .then(res => res.text())
                .then(code => {
                    console.log(srcUrl);
                    console.log(code);
                    this.editor.setValue(code);
                });
        }

        window.addEventListener("message", this.onAppError.bind(this), false);

        this.setAppState(AppStates.Stopped);
    }

    setAppState(newState) {
        this.appState = newState;
        this.appStateDisplay.textContent = this.appState;
    }

    onAppError(ev) {
        let msg = JSON.parse(ev.data);
        if (msg.cmd == "err") {
            this.setAppState(AppStates.Error);
        }
    }

    stopApp() {
        this.clearCanvas();
        this.setAppState(AppStates.Stopped);
    }

    runCode() {
        this.stopApp();

        let errScript = this.previewFrameDocument.createElement("script");
        errScript.innerHTML = `window.addEventListener("error", (e) => {
            let errText = document.createElement("p");
            errText.style = "color: #900;";
            errText.innerHTML = e.message + " (line: " + e.lineno + ", column: " + e.colno + ")";
            document.body.appendChild(errText);
            parent.postMessage(JSON.stringify({ cmd: "err", err: e }));
        });`;

        this.previewFrameDocument.body.appendChild(errScript);

        let sketchScript = this.previewFrameDocument.createElement("script");
        sketchScript.type = "module";
        sketchScript.innerHTML = this.editor.getValue();
        this.previewFrameDocument.body.appendChild(sketchScript);
        this.setAppState(AppStates.Running);
    }

    clearCanvas() {
        this.previewFrameDocument.body.innerHTML = '';
        this.previewFrame.remove();

        let canvas = document.getElementById("previewframediv");
        this.previewFrame = document.createElement("iframe");
        this.previewFrame.id = "previewframe";
        canvas.appendChild(this.previewFrame);
        this.previewFrameDocument = this.previewFrame.contentWindow.document;
    }
}

let editor;
function stopCode() { editor.stopApp(); }
function runCode() { editor.runCode(); }
document.addEventListener("DOMContentLoaded", () => {
    editor = new AmeliaEditor("previewframe", "codeeditor", "app-state");
});

function goBack() {
    if (history.length <= 1
        && confirm("Do you want to close the amelia editor?")) {
        close();
    }
    else history.back();
}