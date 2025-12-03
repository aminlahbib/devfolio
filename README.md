# DevFolio

A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations, dark mode, and a clean design.

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, if using Gemini API):
```env
GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Docker Deployment

### Using Docker

```bash
# Build the image
docker build -t devfolio:latest .

# Run the container
docker run -d -p 80:80 --name devfolio-app devfolio:latest
```

### Using Docker Compose

```bash
docker-compose up -d
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Project Structure

```
devfolio/
├── components/      # Reusable React components
├── pages/          # Page components
├── services/       # API and data services
├── types.ts        # TypeScript type definitions
├── App.tsx         # Main application component
└── index.tsx       # Application entry point
```

## License

This project is private and proprietary.
