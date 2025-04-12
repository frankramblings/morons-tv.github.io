#!/bin/bash

# Script to build the static version for GitHub Pages

# Save the original main.tsx
cp client/src/main.tsx client/src/main.tsx.bak

# Copy staticMain.tsx to main.tsx
cp client/src/staticMain.tsx client/src/main.tsx

echo "Building static version..."
npx vite build --config vite.static.config.ts

# Restore original main.tsx
mv client/src/main.tsx.bak client/src/main.tsx

echo "Static build completed. Files are in the dist/ directory."
echo "You can now deploy the dist/ directory to GitHub Pages."