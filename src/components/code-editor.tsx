import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get unformatted code
    const unformattedCode = editorRef.current.getModel().getValue();

    // format code
    const formattedCode = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    // put formatted code in editor
    editorRef.current.setValue(formattedCode);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="500px"
        theme="dark"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
