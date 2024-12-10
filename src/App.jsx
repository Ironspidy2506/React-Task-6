import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Ref Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*+-/_";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white">
      <div className="bg-gray-900 p-12 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h1 className="text-5xl font-extrabold text-center mb-10">
          Password Generator
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-grow px-6 py-4 text-lg rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="px-6 py-4 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition focus:ring-4 focus:ring-blue-500"
          >
            Copy
          </button>
        </div>

        <div className="space-y-6 text-lg">
          <div>
            <label className="flex justify-between items-center font-semibold">
              <span>Password Length:</span>
              <span className="text-xl font-bold">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full mt-4 h-3 bg-gray-700 accent-blue-500 rounded-full cursor-pointer"
            />
          </div>

          <label className="flex items-center gap-3 font-semibold">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed((prev) => !prev)}
              className="w-6 h-6 accent-blue-600"
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-3 font-semibold">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed((prev) => !prev)}
              className="w-6 h-6 accent-blue-600"
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
