import "bulmaswatch/superhero/bulmaswatch.min.css";
import { createRoot } from "react-dom/client";
import TextEditor from "./components/text-editor";

const App = () => {
  const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;
  return (
    <div>
      <TextEditor />
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
