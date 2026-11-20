# VALORANT Strategy Hub

A single-page web application I created for MI 349. This website helps VALORANT players explore maps, find team compositions, learn agent counters, and browse crosshair presets.

## About the Project

I created this website to make it easier for VALORANT players to find useful information about maps, agents, and team strategies in one place.

The application uses JavaScript to dynamically display information without reloading the page.

## Features

- **Home:** Introduces the website and its features.
- **Maps:** Displays VALORANT maps with recommended agents.
- **Team Comps:** Suggests team compositions based on the selected map and playstyle.
- **Counters:** Shows agent counters and explanations.
- **Crosshairs:** Displays crosshair presets with previews and import codes.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- CSS Grid
- Flexbox
- Responsive media queries

## API Integration

I used the public VALORANT API to retrieve agent and map information.

**API:** https://valorant-api.com/

**Endpoints:**
- `/v1/agents?isPlayableCharacter=true` — Retrieves agent information.
- `/v1/maps` — Retrieves map information.

JavaScript's `fetch()` function retrieves the data and dynamically displays it on the website.

Team compositions, agent counters, and crosshair presets are stored in JavaScript.

## Responsive Design

I used a mobile-first approach with CSS Grid, Flexbox, and media queries.

The website adjusts its navigation and card layouts for mobile, tablet, and desktop screens.

## Accessibility

I included visible keyboard focus indicators, responsive layouts, readable text colors, and reduced-motion support.

More information about accessibility is available in [ACCESSIBILITY.md](ACCESSIBILITY.md).

## AI Usage

I used ChatGPT to help with my CSS and JavaScript. I also reused a lot of the code and styling from my previous MI 349 portfolio project.

I documented my AI usage in a comment at the top of `style.css`.

