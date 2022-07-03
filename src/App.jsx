import React, { useState, useRef } from "react";

const App = () => {
  const [pairs, setPairs] = useState([]);
  const downloadRef = useRef(null);

  const createJSON = () => JSON.stringify(pairs);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(createJSON()).then(
      () => console.log("success"),
      () => console.log("fail")
    );
  };

  const downloadJSON = (e) => {
    e.preventDefault();
    downloadRef.current.setAttribute(
      "href",
      `data:text/json;charset=utf-8,${encodeURIComponent(createJSON())}`
    );
  };

  const updateKey = (e, oldVal, ind) => {
    e.preventDefault();
    console.log("ov", oldVal);
    setPairs([...pairs]); // , pairs: e.currentTarget.value ]);
  };

  const updateValue = (e) => {
    e.preventDefault();
    setPairs(e.currentTarget.value);
  };

  const addPair = () => {
    const uuid = Math.random().toString(36).substring(2, 15);
    setPairs([...pairs, { [uuid]: "" }]);
  };

  const kvp = pairs.map((value, index) => {
    return (
      <div key={`kpv-${index}`}>
        <div className="input-field">
          <label htmlFor="key" aria-label="key">
            <input
              id="key"
              type="text"
              value={value[0]}
              onChange={(e) => updateKey(e, value, index)}
            />
          </label>
        </div>
        <div className="input-field">
          <label htmlFor="value" aria-label="value">
            <input
              id="value"
              type="text"
              value={value[1]}
              onChange={(e) => updateValue(e, index)}
            />
          </label>
        </div>
      </div>
    );
  });

  return (
    <>
      <form id="pairs">
        <div className="kvp">{kvp}</div>
      </form>
      <div>
        <div className="control-panel">
          <button className="btn" onClick={addPair}>
            +
          </button>
          <button className="btn" onClick={copyToClipboard}>
            Copy to Clipboard
          </button>
          <a
            className="btn"
            ref={downloadRef}
            download="result.json"
            role="button"
            onClick={downloadJSON}
          >
            Download JSON
          </a>
        </div>
      </div>
    </>
  );
};

export default App;
