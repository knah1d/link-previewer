# Link Previewer

Link Previewer is a modern web application that generates beautiful link previews for any URL. Just paste a link, and see what it looks like before clicking.

## Features

- 🔗 Generate link previews for any URL
- 🖼️ Display website metadata including title, description, images
- 🌗 Dark/Light mode toggle
- 🧩 Responsive design works on all devices
- 🚀 Fast preview generation
- 📱 Modern, clean user interface
- 🔄 Recent previews history

## Technologies Used

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Express.js
- Cheerio (for HTML parsing)
- Axios (for HTTP requests)

## Getting Started

### Prerequisites
- Node.js v18+ 
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/link-previewer.git
cd link-previewer
```

2. Start the backend API
```bash
cd api
npm install
npm run dev
```

3. Start the frontend client (in a new terminal)
```bash
cd client
npm install
npm run dev
```

4. Open your browser and navigate to `http://localhost:3001`

### Docker Deployment

To run the entire application using Docker:

```bash
docker-compose up -d
```

This will build and start the API, client, and Nginx proxy services. 
Access the application at `http://localhost`

## API Endpoints

### POST /api/preview

Generates a preview for the provided URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples in documents.",
  "image": "https://example.com/image.jpg",
  "favicon": "https://example.com/favicon.ico",
  "siteName": "example.com"
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
