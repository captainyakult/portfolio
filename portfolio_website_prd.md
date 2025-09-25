
# Portfolio Website PRD

## Purpose and Goals
- **Showcase**: Display past work in 3D visualization and interactive web engineering.
- **Document**: Present ongoing experiments in AI, machine learning, and robotics.
- **Minimal & Updatable**: Keep it low-maintenance and easy to update with simple JSON files.
- **Agentic UI**: Include a subtle, interactive UI helper to guide visitors.

## Tech Stack
- **Framework**: Next.js for static generation and routing.
- **3D Library**: React Three Fiber + drei for subtle 3D effects.
- **UI Kit**: Possibly use @react-three/uikit for 3D-positioned UI elements.
- **Styling**: Custom CSS, potentially with a minimal color palette generated from an open-source tool.
- **Hosting**: Vercel.
- **Domain**: jacksimpson.dev.

## Content Structure
- **JSON Schemas**: 
  - Projects: `title`, `description`, `technologies`, `images`, `demoLink`.
  - Experiments: `name`, `type`, `description`, `media`, `results`.

## Routes and Pages
- **Home Page**: Introduction and navigation options.
- **Projects Page**: Lists projects with 3D portal transitions into details.
- **Experiments Page**: Shows experiments in a similar interactive format.

## Agentic UI Element
- A floating helper that provides quick navigation and answers user queries (e.g., filter projects, download resume).

## Design Considerations
- **Minimalist Design**: Monochromatic or subtle color palette, clean typography.
- **3D Elements**: Use subtle 3D micro-animations, gentle physics, and smooth portal-style transitions.
- **Color Palette**: Generate CSS variables from an open-source tool like Coolors during the build process.
