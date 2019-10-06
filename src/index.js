import { h, render, Component, Fragment } from "preact";
import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import "./main.css";

M.AutoInit();

const renderInputs = () => {
  const Inputs = (
    <div class="kvp">
      <div class="input-field col s6">
        <input id="key" type="text" />
        <label for="key">Key</label>
      </div>
      <div class="input-field col s6">
        <input id="value" type="text" />
        <label for="value">Value</label>
      </div>
    </div>
  );

  render(Inputs, document.getElementById("pairs"));
};

const copyToClipboard = () => {
  const json = createJSON();
  navigator.clipboard.writeText(json).then(
    function() {
      console.log("success");
    },
    function() {
      console.log("fail");
    }
  );
};

const downloadJSON = () => {
  const downloadBtn = document.getElementById("download");

  downloadBtn.setAttribute(
    "href",
    `data:text/json;charset=utf-8,${encodeURIComponent(createJSON())}`
  );
};

const createJSON = () => {
  const json = {};
  document.querySelectorAll(".kvp").forEach(v => {
    json[v.childNodes[0].childNodes[0].value] =
      v.childNodes[1].childNodes[0].value;
  });
  return JSON.stringify(json);
};

(function() {
  document.querySelector(".add").addEventListener("click", renderInputs);
  document
    .getElementById("clipboard")
    .addEventListener("click", copyToClipboard);
  document.getElementById("download").addEventListener("click", downloadJSON);
})();
