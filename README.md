# Portfolio

A minimalist portfolio website featuring an interactive desktop-inspired interface. Built with Next.js 16 and React 19.

## Features

- **Draggable Folders**: Interactive folder icons that can be dragged around the homepage, with positions persisted to localStorage
- **Project Carousel**: A navigable showcase for displaying projects with descriptions and links
- **Experience Timeline**: A vertical timeline component for displaying work history
- **Minimal Design**: Clean, white aesthetic with subtle interactions and smooth transitions
- **Responsive Layout**: Percentage-based positioning for consistent display across screen sizes

## Tech Stack

| Technology   | Version |
| ------------ | ------- |
| Next.js      | 16.0.10 |
| React        | 19.2.1  |
| TypeScript   | 5.x     |
| Tailwind CSS | 4.x     |
| ESLint       | 9.x     |

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home - Desktop interface with draggable folders
│   ├── me/page.tsx        # About - Personal bio and background
│   ├── projects/page.tsx  # Projects - Carousel showcase
│   ├── experience/page.tsx # Experience - Work history timeline
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
└── components/
    ├── DraggableFolder.tsx # Drag-and-drop folder with persistence
    ├── Carousel.tsx        # Project navigation slider
    ├── Timeline.tsx        # Work experience visualization
    └── Icons.tsx           # Custom SVG folder icons
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Pages

### Home (`/`)

The landing page features an interactive desktop-style interface. Folders can be clicked to navigate to different sections, or dragged to rearrange. Folder positions are saved to the browser's localStorage and persist across sessions.

### About (`/me`)

A personal bio page with background information, current interests, and ongoing projects.

### Projects (`/projects`)

A carousel component for browsing through projects. Each project card displays a title, description, optional icon, and link. Navigate using the previous/next buttons or click the dot indicators.

### Experience (`/experience`)

A vertical timeline displaying work history. Each entry shows the company name, role, date range, location, and a brief description.

## Components

### DraggableFolder

A client-side component that enables drag-and-drop functionality. Key features:

- Tracks mouse position and calculates delta movements as percentages
- Stores position in localStorage using the folder's href as a unique key
- Distinguishes between clicks and drags to preserve navigation behavior
- Shows visual feedback with grab/grabbing cursors

### Carousel

A project showcase component with:

- Previous and next navigation buttons
- Clickable dot indicators for direct navigation
- Circular navigation (loops from last to first project)
- Support for project icons, titles, descriptions, and external links

### Timeline

A work experience visualization featuring:

- Vertical connecting line with dot markers
- Support for company logos
- Display of company, role, date, location, and description
- Clean, minimal styling

### Icons

Custom SVG components for folder icons:

- BlackFolder: Solid black folder
- GrayFolder: Checkered gray/white pattern
- YellowFolder: Checkered yellow pattern
- ArrowIcon: Right-pointing arrow for external links

## Customization

### Adding Projects

Edit the `projects` array in `src/app/projects/page.tsx`:

```tsx
const projects = [
  {
    title: "Project Name",
    description: "Brief description of the project.",
    link: "https://github.com/username/repo",
    icon: <YourIcon className="w-6 h-6" />, // optional
  },
];
```

### Adding Work Experience

Edit the `jobs` array in `src/app/experience/page.tsx`:

```tsx
const jobs = [
  {
    company: "Company Name",
    role: "Job Title",
    date: "Jan 2024 - Present",
    location: "City, State",
    description: "Description of responsibilities and accomplishments.",
    logo: <CompanyLogo />, // optional
  },
];
```

### Modifying Folder Positions

Folder initial positions are set in `src/app/page.tsx` via the `initialX` and `initialY` props (percentages). To reset saved positions, clear the corresponding localStorage keys (format: `folder-position-{href}`).

## Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Create optimized production build        |
| `npm run start` | Run production server                    |
| `npm run lint`  | Run ESLint for code quality checks       |
