# Conner Jordan's Portfolio

A modern portfolio website with a "terminal hacker" theme, built with React, TypeScript, and Vite.

![Terminal Theme Portfolio](https://via.placeholder.com/800x400)

## Features

- 🖥️ Terminal-like interface with command-line navigation
- 🌓 Dark/light mode toggle with theme persistence
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🔍 SEO optimized
- 🔄 GitHub activity feed integration
- 🎯 Interactive elements with Framer Motion animations

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Typed.js** - Terminal typing effect
- **Axios** - API requests
- **GitHub Pages** - Hosting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-2.0.git

# Navigate to the project directory
cd portfolio-2.0

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at http://localhost:3000

## Project Structure

```
portfolio-2.0/
├── .github/               # GitHub Actions workflows
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable components
│   ├── data/              # Static data files
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── themes/            # Theme configuration
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
└── package.json           # Project dependencies and scripts
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### Netlify Deployment

This portfolio is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the Vite configuration
3. The included `netlify.toml` file handles all deployment settings
4. Netlify will automatically deploy when you push to your main branch

### GitHub Pages Deployment

For GitHub Pages deployment:

1. Install dependencies if not already installed: `npm install`
2. Run the deployment script: `./deploy-gh-pages.sh`
3. Your site will be deployed to `https://yourusername.github.io/portfolio-2.0/`

Alternatively, you can run the GitHub Pages deployment manually:
```bash
npm run deploy
```

## Customization

To customize this portfolio for your own use:

1. Update personal information in the components
2. Replace project examples with your own work
3. Modify the theme colors in `src/themes/theme.ts`
4. Update social media links in the Layout component

## License

MIT

## Acknowledgements

- [TypedJS](https://github.com/mattboldt/typed.js/) for the typing animation
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Toggle Dark Mode](https://github.com/JoseRFelix/react-toggle-dark-mode) for the theme toggle
