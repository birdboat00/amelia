window.addEventListener("error", (e) => {
    let errText = document.createElement("p");
    errText.style = "color: #900;";
    errText.innerHTML = e.message + " (line: " + e.lineno + ", column: " + e.colno + ")";
    document.body.appendChild(errText);
    parent.postMessage(JSON.stringify({ cmd: "err", err: e }));
});

function updateCode(src) {
    document.body.innerHTML = '';

    let script = document.createElement("script");
    script.type = "module";
    script.innerHTML = src;

    document.body.appendChild(script);
}
