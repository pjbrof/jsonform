import { h, render, Component, Fragment } from "preact";
import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./main.css";

M.AutoInit();

(function() {
  const createJSON = () => {
    const json = {};
    document.querySelector(".pairs").childNodes.forEach(v => {
      json[v.childNodes[0].value] = v.childNodes[1].value;
    });
    return JSON.stringify(json);
  };

  document.getElementById("download").onclick = () => {
    console.log(createJSON());
  };

  document.querySelector(".add").onclick = () => {
    const Inputs = (
      <>
        <div class="input-field col s6">
          <input id="key" type="text" class="validate" />
          <label for="key">Key</label>
        </div>
        <div class="input-field col s6">
          <input id="Value" type="text" class="validate" />
          <label for="Value">Value</label>
        </div>
      </>
    );

    render(Inputs, document.querySelector(".pairs"));
  };

  document.getElementById("clipboard").onclick = () => {
    const copyTextArea = document.createElement("textarea");

    copyTextArea.value = createJSON();
    copyTextArea.focus();
    copyTextArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Unable to copy");
    }
  };
})();
