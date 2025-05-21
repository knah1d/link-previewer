"use client";

import { useState } from "react";
import axios from "axios";
import { LinkPreview } from "@/components/LinkPreview";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

interface PreviewData {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentPreviews, setRecentPreviews] = useState<PreviewData[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Add http:// if not present
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/preview", { url: formattedUrl });
      const newPreviewData = response.data;
      setPreviewData(newPreviewData);

      // Add to recent previews if not already in list
      setRecentPreviews((prev) => {
        const exists = prev.some((item) => item.url === newPreviewData.url);
        if (exists) return prev;
        return [newPreviewData, ...prev].slice(0, 5); // Keep only the 5 most recent
      });
    } catch (err) {
      console.error("Error fetching preview:", err);
      setError("Failed to fetch link preview. Please check the URL and try again.");
      setPreviewData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Link Previewer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Paste any URL to see a beautiful preview of the link
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a URL (e.g. https://example.com)"
              />
              <Button
                type="submit"
                disabled={loading || !url}
                variant="primary"
                size="lg"
              >
                {loading ? "Loading..." : "Preview Link"}
              </Button>
            </div>
          </form>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {previewData && !loading && (
            <div className="mt-4 mb-10">
              <LinkPreview data={previewData} />
            </div>
          )}

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Examples to try:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "https://github.com",
                "https://twitter.com",
                "https://netflix.com",
                "https://medium.com",
              ].map((exampleUrl) => (
                <button
                  key={exampleUrl}
                  onClick={() => setUrl(exampleUrl)}
                  className="text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  {exampleUrl}
                </button>
              ))}
            </div>
          </div>

          {recentPreviews.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Recent Previews
              </h3>
              <div className="space-y-4">
                {recentPreviews.map((preview, index) => (
                  <div
                    key={`${preview.url}-${index}`}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setUrl(preview.url)}
                  >
                    {preview.favicon && (
                      <img
                        src={preview.favicon}
                        alt=""
                        className="w-5 h-5 mr-3"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">
                        {preview.title || preview.url}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {preview.url}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Created with Next.js and Express • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
