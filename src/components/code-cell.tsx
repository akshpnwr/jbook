import React, { useEffect, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const output = await bundle(input);
        setCode(output.code);
        setErr(output.err);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="console.log('Hello')"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* <div>
          <button type="submit" onClick={onClick}>
            Submit
          </button>
        </div> */}
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
