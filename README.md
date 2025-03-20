# Interactive Flowchart Builder

A simple yet powerful web-based flowchart tool built with Next.js and React. Create and visualize hierarchical structures in an intuitive tree-like interface.

## Features

- 🌳 Tree-style flowchart visualization
- ✏️ Editable node content
- 🔄 Interactive navigation through nodes
- ➕ Add child nodes with one click
- ❌ Delete nodes and their descendants
- 🌓 Dark/Light mode support
- 📱 Responsive design

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```

### Development

Run the development server:
```
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```
bun run build
bun run start
```

## How to Use

1. Start with the root node
2. Click the + button on any active node to add a child
3. Click on any node to make it active and see its:
   - Complete ancestor chain
   - Sibling nodes
   - Child nodes
4. Edit node text by clicking the input field
5. Delete unwanted nodes using the X button (except ancestors of the active node)

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Development Status

This project is under active development. Feel free to contribute by submitting issues or pull requests.