import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Fetches metadata from a URL to generate link preview
 * @param {Object} req - Express request object with url in request body
 * @param {Object} res - Express response object
 */
export const getUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  
  try {
    console.log(`Fetching metadata for URL: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);

    // Enhanced meta tag extraction
    const getMetaTag = (name) => {
      return $(`meta[name="${name}"]`).attr("content") || 
             $(`meta[property="${name}"]`).attr("content") ||
             $(`meta[property="og:${name}"]`).attr("content") ||
             $(`meta[name="twitter:${name}"]`).attr("content");
    };

    // Get favicon
    const getFavicon = () => {
      const favicon = $('link[rel="icon"]').attr('href') || 
                     $('link[rel="shortcut icon"]').attr('href');
      if (favicon && !favicon.startsWith('http')) {
        // Handle relative URLs
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}${favicon.startsWith('/') ? '' : '/'}${favicon}`;
      }
      return favicon;
    };

    const data = {
      url: url,
      title: $("title").text() || getMetaTag("title"),
      description: getMetaTag("description"),
      image: getMetaTag("image") || $('img').first().attr('src'),
      favicon: getFavicon(),
      siteName: getMetaTag("site_name") || new URL(url).hostname,
      allMetaTags: {},
    };
    
    // Collect all meta tags for debugging
    $('meta').each((i, el) => {
      const name = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (name && content) {
        data.allMetaTags[name] = content;
      }
    });

    console.log('Extracted metadata:', JSON.stringify(data, null, 2));
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch metadata", details: err.message });
  }
};
