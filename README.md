# Morons.TV

A satirical broadcast network website "by the dumb people, FOR the dumb people!" that mimics mainstream networks but with absurdly illogical content.

## About

Morons.TV is a satirical website that looks like a legitimate broadcast network but features ridiculous content like:
- "Why Drinking Water is a LIBERAL CONSPIRACY!"
- "I Quit My Job to Invest in NFTs: A Success Story"
- "5G Towers Are Making My Plants Vote Republican"

The site has a professional broadcast network appearance with satirical substance.

## Features

- Authentic broadcast network styling similar to CBS/FOX 
- Homepage with featured shows, program guides, and talent showcase
- Categories organized by level of misinformation
- "Viewer's Choice Awards" section for most popular moronic content
- Newsletter subscription for staying updated on new moronic content

## Development 

### Full-Stack Development (Local)

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Static Version (GitHub Pages)

This project includes a static version that can be deployed to GitHub Pages:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the static version:
   ```
   npm run build:static
   ```

## Deployment to GitHub Pages

### Automatic Deployment

This repository includes a GitHub Actions workflow that will automatically deploy the site to GitHub Pages whenever changes are pushed to the main branch.

1. Fork this repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select "GitHub Actions" as the source
3. Push changes to the main branch, and the site will be automatically deployed

### Manual Deployment

To manually build and deploy:

1. Create a static build:
   ```
   npm run build:static
   ```
2. The build will be created in the `dist` directory
3. Deploy this directory to GitHub Pages

## License

MIT