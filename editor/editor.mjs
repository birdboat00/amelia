const exampleCode = "example.template.mjs";

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
    execBtn;

    constructor(previewFrameId, codeEditorId, appStateId, btnExecId) {
        this.previewFrame = document.createElement("iframe");
        this.previewFrame.id = "previewframe";
        this.previewFrame.src = "previewframe.html";
        document.getElementById("previewframediv").appendChild(this.previewFrame);
        this.previewFrameDocument = this.previewFrame.contentWindow.document;
        this.editorFrame = document.getElementById(codeEditorId);
        this.appStateDisplay = document.getElementById(appStateId);

        this.execBtn = document.getElementById(btnExecId);

        this.editor = CodeMirror(this.editorFrame, {
            lineNumbers: true,
            mode: "javascript",
            theme: "amelia",
            indentUnit: 4,
            tabSize: 4,
            matchBrackets: true,
            autoCloseBrackets: true
        });

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let srcUrl = exampleCode;
        if (urlParams.has("source")) {
            srcUrl = urlParams.get("source");
        }

        fetch(srcUrl)
                .then(res => res.text())
                .then(code => {
                    this.editor.setValue(code);
                });

        window.addEventListener("message", this.onAppError.bind(this), false);

        this.setAppState(AppStates.Stopped);
    }

    setAppState(newState) {
        this.appState = newState;
        this.appStateDisplay.textContent = this.appState;

        if(this.appState == AppStates.Running) {
            this.execBtn.innerText = "■ Stop";
            this.execBtn.onclick = this.stopApp.bind(this);
        } else if (this.appState == AppStates.Stopped) {
            this.execBtn.innerText = "▶ Run";
            this.execBtn.onclick = this.runCode.bind(this);
        } else if (this.appState == AppStates.Error) {
            this.execBtn.innerText = "⚠ Error";
            this.execBtn.onclick = this.stopApp.bind(this);
        }
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

        this.previewFrame.contentWindow.addEventListener("DOMContentLoaded", this.onPreviewContentLoaded.bind(this));

        this.setAppState(AppStates.Running);
    }

    onPreviewContentLoaded() {
        this.previewFrame.contentWindow.updateCode(this.editor.getValue());
    }

    clearCanvas() {
        this.previewFrame.remove();
        let canvas = document.getElementById("previewframediv");
        this.previewFrame = document.createElement("iframe");
        this.previewFrame.id = "previewframe";
        this.previewFrame.src = "previewframe.html";
        canvas.appendChild(this.previewFrame);
        this.previewFrameDocument = this.previewFrame.contentWindow.document;
    }
}

let editor;
function stopCode() { editor.stopApp(); }
function runCode() { editor.runCode(); }
document.addEventListener("DOMContentLoaded", () => {
    editor = new AmeliaEditor("previewframe", "codeeditor", "app-state", "btn-exec");
});

const toggleTheme = () => {
    document.body.classList.toggle("dark");
}