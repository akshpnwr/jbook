import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

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
      wasmURL: "./esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!ref.current) return;

    const res = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });

    setCode(res.code);
  };

  return (
    <div>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <br />
      <button type="submit" onClick={onClick}>
        Submit
      </button>
      <pre>{code}</pre>
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
