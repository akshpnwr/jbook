import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundler from "./bundler";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Hello')"
        onChange={(value) => setInput(value)}
      />
      <br />
      <button type="submit" onClick={onClick}>
        Submit
      </button>
      <br />
      <Preview code={code} />
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
