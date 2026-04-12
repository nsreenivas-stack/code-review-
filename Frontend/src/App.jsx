import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const BACKEND_URL = "https://code-review-backend-iyev.onrender.com";

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
];

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);
  const [language, setLanguage] = useState("javascript");
  const [prism, setPrism] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const loadPrism = async () => {
      const Prism = (await import("prismjs")).default;
      if (language === "python") await import("prismjs/components/prism-python");
      if (language === "java") await import("prismjs/components/prism-java");
      if (language === "cpp") await import("prismjs/components/prism-cpp");
      if (language === "c") await import("prismjs/components/prism-c");
      setPrism(Prism);
    };
    loadPrism();
  }, [language]);

  async function reviewCode() {
    const response = await axios.post(`${BACKEND_URL}/ai/review`, {
      code,
      language,
    });
    setReview(response.data.review);
    fetchHistory();
  }

  async function fetchHistory() {
    const response = await axios.get(`${BACKEND_URL}/ai/history`);
    setHistory(response.data.reviews);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  const highlightCode = (code) => {
    if (!prism) return code;
    const grammar = prism.languages[language] || prism.languages.javascript;
    return prism.highlight(code, grammar, language);
  };

  return (
    <>
      <main>
        <div className="left">
          <div className="language-bar">
            {languages.map((lang) => (
              <button
                key={lang.value}
                className={`lang-btn ${language === lang.value ? "active" : ""}`}
                onClick={() => setLanguage(lang.value)}
              >
                {lang.label}
              </button>
            ))}
            <button
              className={`lang-btn history-btn ${showHistory ? "active" : ""}`}
              onClick={() => setShowHistory(!showHistory)}
            >
              History ({history.length})
            </button>
          </div>

          {showHistory ? (
            <div className="history-panel">
              {history.length === 0 ? (
                <p className="no-history">No reviews yet!</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item._id}
                    className="history-item"
                    onClick={() => {
                      setCode(item.code);
                      setLanguage(item.language || "javascript");
                      setReview(item.review);
                      setShowHistory(false);
                    }}
                  >
                    <span className="history-lang">{item.language || "js"}</span>
                    <span className="history-code">
                      {item.code.slice(0, 60)}...
                    </span>
                    <span className="history-date">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="code">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={highlightCode}
                padding={10}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
          )}

          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
