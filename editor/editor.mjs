function runCode() {
    let textarea = document.getElementById("editortext");
    let previewFrame = document.getElementById("previewframe");

    if(previewFrame && previewFrame.contentWindow) {
        console.log("submitting code");
        console.log(textarea.value);
        let pfd = previewFrame.contentWindow.document;
        pfd.body.innerHTML = '';
        let script = pfd.createElement("script");
        script.type = "module";
        script.innerHTML = textarea.value;
        pfd.body.appendChild(script);
    }
}