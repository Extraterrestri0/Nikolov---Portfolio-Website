import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { EditorToolbar } from './EditorToolbar';
import { OutputPanel } from './OutputPanel';

const defaultCode = {
  javascript: `// Write your JavaScript code here
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  typescript: `// Write your TypeScript code here
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  python: `# Write your Python code here
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
  java: `// Write your Java code here
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  html: `<!-- Write your HTML code here -->
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
  css: `/* Write your CSS code here */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}`
};

export function CodeEditor() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultCode[language as keyof typeof defaultCode]);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage as keyof typeof defaultCode]);
    setOutput('');
    setError(null);
  };

  const handleRun = () => {
    setError(null);
    try {
      // For demonstration purposes, we'll just evaluate JavaScript code
      if (language === 'javascript') {
        const result = new Function(code)();
        setOutput(String(result));
      } else {
        setOutput('Code execution is simulated for non-JavaScript languages.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      <EditorToolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        onDownload={handleDownload}
        onCopy={handleCopy}
      />
      
      <div className="h-[400px]">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
      
      <OutputPanel output={output} error={error} />
    </div>
  );
}