import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

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

    iframeRef.current.srcdoc = html;

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

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
      </body>

      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data)
          }catch(err){
            const root = document.getElementById('root')
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
            console.error(err)
          }
        }, false);
      </script>
    </html>
  `;

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
      <br />
      <br />

      <iframe
        sandbox="allow-scripts"
        srcDoc={html}
        ref={iframeRef}
        title="preview"
      />
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
