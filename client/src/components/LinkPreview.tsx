import React from 'react';
import Image from 'next/image';

interface PreviewData {
  url: string;
  title: string;
  description: string;
  image: string;
  favicon: string;
  siteName: string;
}

interface LinkPreviewProps {
  data: PreviewData;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.image && (
          <div className="md:col-span-1 h-48 md:h-full relative">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${data.image})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <img 
              src={data.image} 
              alt={data.title || "Link preview"} 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // Handle image loading errors
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className={`p-6 ${data.image ? "md:col-span-2" : "md:col-span-3"}`}>
          <div className="flex items-center mb-3">
            {data.favicon && (
              <img 
                src={data.favicon} 
                alt="" 
                className="w-5 h-5 mr-2"
                onError={(e) => {
                  // Handle favicon loading errors
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {data.siteName || new URL(data.url).hostname}
            </span>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            {data.title || "No title available"}
          </h2>
          
          {data.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {data.description}
            </p>
          )}
          
          <a 
            href={data.url} 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Visit Link
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
