"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [clickCount, setClickCount] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("urlHistory");
    if (stored) setHistory(JSON.parse(stored));

    const savedShort = localStorage.getItem("currentShortURL");
    const savedCount = localStorage.getItem("currentClickCount");

    if (savedShort) setShortUrl(savedShort);
    if (savedCount) setClickCount(Number(savedCount));
  }, []);

  const saveToHistory = (newUrl: string) => {
    const updated = [newUrl, ...history.slice(0, 4)];
    setHistory(updated);
    localStorage.setItem("urlHistory", JSON.stringify(updated));
  };

  const handleShorten = async () => {
    if (!url.trim()) return;
    try {
      const res = await axios.post(`${API_BASE}/api/shorten/`, {
        original_url: url,
      });
      const shortened = res.data.short_url;
      setShortUrl(shortened);
      setUrl("");
      saveToHistory(shortened);

      const shortCode = shortened.split("/").pop();
      const analyticsRes = await axios.get(
        `${API_BASE}/api/analytics/${shortCode}`
      );
      const count = analyticsRes.data.click_count;
      setClickCount(count);

      localStorage.setItem("currentShortURL", shortened);
      localStorage.setItem("currentClickCount", count.toString());
    } catch (err) {
      console.error(err);
      alert("Failed to shorten URL");
    }
  };

  const handleClear = () => {
    setShortUrl("");
    setClickCount(null);
    localStorage.removeItem("currentShortURL");
    localStorage.removeItem("currentClickCount");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🔗 URL Shortener
        </h1>

        <input
          type="text"
          className="border border-zinc-600 bg-zinc-800 text-white w-full p-3 rounded mb-4 placeholder:text-zinc-400"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full mb-6"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mb-4">
            <p className="font-semibold">Short URL:</p>
            <a
              href={shortUrl}
              className="text-blue-400 underline break-all"
              target="_blank"
            >
              {shortUrl}
            </a>
            {clickCount !== null && (
              <p className="text-sm text-zinc-400 mt-1">Click count: {clickCount}</p>
            )}
            <div className="flex gap-6 mt-2">
              <button
                onClick={async () => {
                  const code = shortUrl.split("/").pop();
                  const res = await axios.get(`${API_BASE}/api/analytics/${code}`);
                  const count = res.data.click_count;
                  setClickCount(count);
                  localStorage.setItem("currentClickCount", count.toString());
                }}
                className="text-sm text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                🔄 Refresh click count
              </button>
              <button
                onClick={handleClear}
                className="text-sm text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                ❌ Clear current short URL
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h2 className="font-semibold mb-3 text-lg">Last 5 Shortened URLs:</h2>
          <ul className="list-disc list-inside space-y-1 text-green-400">
            {history.map((link, idx) => (
              <li key={idx}>
                <a href={link} className="underline break-all" target="_blank">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
