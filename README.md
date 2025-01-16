# GitPad

GitPad is a modern web application built with React, TypeScript, and Tailwind CSS. It provides a rich text editing experience using TipTap.

<h2 align="left">
<a href="https://gitpad.surajthotakura.com/" target="_blank" rel="noreferrer noopener">View Demo</a>
</h2>

## Features

- Rich text editing with TipTap
- Modern UI components with Radix UI
- Responsive design with Tailwind CSS
- TypeScript support for enhanced development experience

## Prerequisites

- Node.js (>= 18.x)
- npm or yarn package manager

## Getting Started

1. Install dependencies:

```bash
npm i
```

2. Start the development server:

```bash
npm run dev
```

3. To host on the local network and test the application on other devices:

```bash
npm run host
```

## Tech Stack

- **Frontend Framework**: React 18
- **Type System**: TypeScript
- **Styling**:
  - Tailwind CSS
  - tailwindcss-animate
  - @tailwindcss/typography
- **UI Components**:
  - Radix UI components
  - Lucide React icons
- **Editor**: TipTap
- **State Management**: Jotai
- **Build Tools**: Vite

## Development

The project uses several modern development tools:

- ESLint for code linting
- TypeScript for type checking
- Vite for fast development and building

## Bug Tracker

Bugs fixed, pending and observed during the development are tracked under `/src/notes/bugtracker.md`

## UI Screens

The designs might not match the actual implementation. The designs are just rough ideas of how the UI should look like. They are made using figma.

![History UI](./public/UIscreens/Version%20history%20closed.jpg)

Simple Editor UI with Light and Dark themes and a toolbar for basic text formatting

---

![History UI](./public/UIscreens/Version%20history%20open.jpg)

Version history browser which opens on clicking the history button on the bottom left of the editor

---

## Alternative UI

![Vertical History UI](./public/UIscreens/Vertical%20Version%20history%20open.jpg)

Alternative UI with a vertical history browser optimized for conserving vertical screen space
