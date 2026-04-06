# CCSHUB - Central Coast Section Athletics

<div align="center">

![CCSHUB Logo](https://www.cifccs.org/images/logo.png)

**The premier digital destination for CIF Central Coast Section high school athletics**

Real-time scores • Power rankings • Elite player spotlights • Team schedules

[Live Site](https://usbsc.github.io/ccshub/) • [Report Bug](https://github.com/usbsc/ccshub/issues) • [Request Feature](https://github.com/usbsc/ccshub/issues)

</div>

---

## 🏈 About

CCSHUB is a modern web application providing comprehensive coverage of high school athletics in California's CIF Central Coast Section. Built with React and TypeScript, it offers fans, players, and coaches a fast, accessible platform to track games, rankings, and player statistics.

### Features

- **📊 Live Scores** - Real-time game updates and scores
- **🏆 Power Rankings** - In-depth team rankings and statistics
- **⭐ Player Spotlights** - Elite athlete profiles and stats
- **📅 Schedules** - Complete game schedules across all levels
- **🎮 Game Details** - Comprehensive game breakdowns and highlights
- **🌙 Dark Mode** - Optimized viewing experience
- **📱 Responsive** - Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/usbsc/ccshub.git
   cd ccshub
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173/ccshub/](http://localhost:5173/ccshub/) in your browser

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## 🛠️ Tech Stack

- **Framework**: [React 18.3](https://react.dev/)
- **Build Tool**: [Vite 6.3](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
ccshub/
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── common/      # Shared components
│   │   │   └── ui/          # UI library components
│   │   ├── data/            # Static data and types
│   │   ├── hooks/           # Custom React hooks
│   │   ├── constants.ts     # App-wide constants
│   │   ├── routes.tsx       # Route configuration
│   │   └── App.tsx          # Root component
│   ├── styles/              # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Production build output
└── ...config files
```

## 🎨 Code Quality

This project maintains high code quality standards:

- ✅ **TypeScript** - Strict type checking enabled
- ✅ **ESLint** - Linting with React and TypeScript rules
- ✅ **Prettier** - Consistent code formatting
- ✅ **EditorConfig** - Consistent coding styles across editors

## 🚢 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

### Manual Deployment

```bash
npm run build
# Deploy the dist/ directory to your hosting provider
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Run `npm run lint` and `npm run format` before committing
- Ensure `npm run build` succeeds
- Write clear commit messages
- Update documentation as needed

## 📝 License

This project is private and proprietary.

## 🔒 Security

See [SECURITY.md](SECURITY.md) for information on reporting security vulnerabilities.

## 📧 Contact

For questions or feedback:
- Email: udaya@jaysingh.com
- GitHub Issues: [Create an issue](https://github.com/usbsc/ccshub/issues)

## 🙏 Acknowledgments

- CIF Central Coast Section for athletics data
- All contributors and supporters of high school athletics
- Open source community for the amazing tools and libraries

---

<div align="center">
Made with ❤️ for Central Coast Section Athletics
</div>
