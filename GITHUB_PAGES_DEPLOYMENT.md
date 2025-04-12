# GitHub Pages Deployment Guide for Morons.TV

This guide will walk you through deploying the Morons.TV website to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. Node.js and npm installed

## Steps to Deploy

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and create a new repository
   - Name it `morons-tv` (or any name you prefer)
   - Make it public
   - Do not initialize with a README

### 2. Update Repository Settings

In your newly created repository:

1. Update `vite.static.config.ts`:
   - Change the `base` property to match your repository name:
   ```ts
   base: '/your-repository-name/', // e.g., '/morons-tv/'
   ```

2. Update `client/public/404.html`:
   - Change the `repoName` variable to match your repository name:
   ```js
   var repoName = '/your-repository-name'; // e.g., '/morons-tv'
   ```

### 3. Push Code to GitHub

1. Initialize git repository locally:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repository-name.git
   git branch -M main
   git push -u origin main
   ```

### 4. Build the Static Version

1. Run the build script:
   ```bash
   ./build-static.sh
   ```
   This will:
   - Create a static version with mock data
   - Place the build in the `dist` directory

### 5. Deploy to GitHub Pages

#### Option 1: Manual Deployment

1. Install the gh-pages package globally:
   ```bash
   npm install -g gh-pages
   ```

2. Deploy the dist folder:
   ```bash
   gh-pages -d dist
   ```

#### Option 2: GitHub Actions (Automated)

1. Enable GitHub Pages in your repository:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages (create it if it doesn't exist)

2. GitHub Actions will automatically deploy when you push to main because we've already set up the workflow file in `.github/workflows/deploy-to-gh-pages.yml`

### 6. Access Your Site

After deployment completes, your site will be available at:
`https://your-username.github.io/your-repository-name/`

## Troubleshooting

### 404 Errors on Routes

If you get 404 errors when navigating to sub-routes directly (e.g., `/browse`), make sure:

1. The 404.html file has the correct repository name
2. The script in index.html is properly handling routing

### Images Not Loading

If images aren't loading, check that the paths in the mock data are accessible. You might need to use absolute URLs for images.