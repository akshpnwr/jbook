import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const ref = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
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
      <br />
      <Preview code={code} />
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
