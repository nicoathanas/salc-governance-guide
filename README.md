# SALC Regional Governance Guide

This repository contains the public website files for the SALC Regional Governance Guide.

The site is a static website, which means it can be hosted directly from GitHub Pages without a build step.

## Main Files

- `index.html` - homepage, jurisdiction dashboards, governance guide, key issues, and public meetings.
- `elections.html` - election dates, ballot outline, and election resources.
- `water.html`, `housing.html`, `transportation.html`, `economic-development.html`, `education.html` - key issue pages.
- `styles.css` - site design, layout, colors, and responsive styling.
- `script.js` - interactive behavior.
- `images/` - site images and visual assets.

## Editing Content

Most content edits can be made directly in the relevant `.html` file. After editing, open `index.html` in a browser to review the site locally.

For larger visual changes, edit `styles.css`. For interactive behavior, edit `script.js`.

## Publishing With GitHub Pages

1. Create a public GitHub repository.
2. Upload or push these files to the repository.
3. In GitHub, open `Settings` then `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and the `/root` folder.
6. Save. GitHub will publish the live site and show the public URL.

## Updating the Live Site

After GitHub Pages is enabled, edits to files on the `main` branch will update the live site automatically after GitHub finishes publishing.
