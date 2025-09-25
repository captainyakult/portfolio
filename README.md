# Jack Simpson - Interactive Portfolio

A modern, interactive portfolio website built with Next.js and React Three Fiber, featuring subtle 3D animations and an AI-powered assistant helper.

## 🌟 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **3D Interactive Elements**: Powered by React Three Fiber and drei for immersive experiences
- **Agentic UI Helper**: Floating assistant with quick navigation and query capabilities
- **Responsive Design**: Optimized for all devices with glass morphism effects
- **Performance Optimized**: Static generation with excellent Core Web Vitals
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **3D Graphics**: React Three Fiber + drei
- **Animation**: CSS transitions and 3D transforms

### Content Management
- **Projects**: JSON-based data structure
- **Experiments**: Dynamic filtering and categorization
- **Media**: Optimized image loading with Next.js Image

### Development
- **Linting**: ESLint with Next.js configuration
- **Type Safety**: Full TypeScript coverage
- **Build Tool**: Next.js with Webpack optimization

## 🎨 Design Features

### Color Palette
- **Dark Theme**: Modern dark background with subtle gradients
- **Accent Colors**: Blue (#3b82f6), Purple (#8b5cf6), Cyan (#06b6d4)
- **Glass Morphism**: Translucent elements with backdrop blur
- **Responsive Typography**: Fluid type scales

### 3D Elements
- **Subtle Animations**: Floating geometric shapes with physics
- **Portal Transitions**: Interactive project navigation
- **Particle Systems**: Dynamic background effects
- **Responsive 3D**: Optimized for different screen sizes

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── experiments/        # Experiments showcase
│   ├── projects/           # Projects gallery and details
│   ├── globals.css         # Global styles and CSS variables
│   └── layout.tsx          # Root layout with navigation
├── components/             # Reusable UI components
│   ├── Hero.tsx           # Landing page hero section
│   ├── Navigation.tsx     # Header navigation
│   ├── AgenticHelper.tsx  # AI assistant interface
│   ├── AboutSection.tsx   # About page content
│   └── FeaturedWork.tsx   # Homepage featured projects
├── data/                  # JSON data files
│   ├── projects.json      # Project information
│   └── experiments.json   # Research experiments
├── lib/                   # Utility functions
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
    └── index.ts          # Project and experiment types
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📄 Content Management

### Adding Projects
Edit `src/data/projects.json` with the following structure:
```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Three.js"],
  "images": ["/images/projects/project.jpg"],
  "demoLink": "https://demo.com",
  "githubLink": "https://github.com/...",
  "featured": true,
  "completedDate": "2024-12-01"
}
```

### Adding Experiments
Edit `src/data/experiments.json` with the following structure:
```json
{
  "id": "unique-experiment-id",
  "name": "Experiment Name",
  "type": "AI" | "ML" | "Robotics" | "WebGL" | "3D" | "Research",
  "description": "Experiment description",
  "media": [{"type": "image", "url": "/images/...", "alt": "..."}],
  "results": "Results summary",
  "status": "active" | "completed" | "paused",
  "startDate": "2024-01-01",
  "technologies": ["TensorFlow", "React"]
}
```

## 🎯 Performance

- **First Load JS**: ~82KB (shared)
- **Static Generation**: All pages pre-rendered
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **3D Optimization**: Efficient geometry and materials

## 🧪 Testing

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: >80% target coverage
- **Run**: `npm test` (watch) or `npm run test:ci` (CI)

### E2E Testing  
- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Run**: `npm run test:e2e` or `npm run test:e2e:ui`

### Performance Testing
- **Tool**: Lighthouse CI
- **Metrics**: Performance >80%, Accessibility >95%
- **Automated**: Runs on staging deployments

## 🚀 Deployment

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Quality Gates**: Linting, type checking, tests, build verification
- **Environments**: Staging (develop branch) + Production (main branch)

### Quick Deploy
```bash
# Staging
./scripts/deploy.sh staging

# Production  
./scripts/deploy.sh production
```

### Supported Platforms
- **Vercel** (primary) - Optimized Next.js hosting
- **Netlify** - Alternative static hosting
- **AWS Amplify** - Enterprise deployment
- Any static hosting service

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Configure Vercel project: `npx vercel link`
3. Set up GitHub secrets (see [DEPLOYMENT.md](./DEPLOYMENT.md))

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests if needed
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🎨 Credits

- **3D Graphics**: React Three Fiber community
- **Design Inspiration**: Modern portfolio trends
- **Icons**: CSS and emoji-based icons
- **Typography**: Inter font family

## 📧 Contact

For questions or collaboration opportunities:
- **Email**: hello@jacksimpson.dev
- **Website**: https://jacksimpson.dev
- **GitHub**: https://github.com/captainyakult

---

Built with ❤️ and cutting-edge web technologies.