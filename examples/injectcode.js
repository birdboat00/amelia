const scriptText = document.getElementById("script");
let exampleScriptText = document.createElement("pre");
let exampleScriptCode = document.createElement("code");
exampleScriptCode.innerHTML = scriptText.innerHTML;
exampleScriptText.appendChild(exampleScriptCode);
document.body.appendChild(exampleScriptText);