import { useState } from "react";
import { createRoot } from 'react-dom/client';

const App = () => {

    const [inputText, setInputText] = useState<string>("");

    const onSubmit = () => {
        console.log("onSubmit");
        console.log(inputText);
    }
    
    return <div>
        <textarea name="" id="" cols={30} rows={10} onChange={(e)=>setInputText(e.target.value)}></textarea>
        <br />
        <button type="submit" onClick={onSubmit}>Submit</button>
    </div>;
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);