# Kainat Javed Portfolio

A professional portfolio website showcasing web development projects with modern design, responsive layout, and interactive features.

## Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Project Gallery**: Dynamic portfolio with filtering, searching, and sorting
- **Live Previews**: Secure iframe previews of live projects
- **Modern Animations**: Smooth transitions and micro-interactions
- **Professional UI**: Clean, modern design with TailwindCSS

## Projects Included

1. **Business Website** - Professional corporate site
2. **Analytical Dashboard** - Data visualization platform
3. **Task Management System** - Collaborative project management
4. **E-Commerce Platform** - Online shopping solution
5. **Self Defence Academy** - Martial arts school website
6. **Social Media Platform** - Full-featured social network
7. **Portfolio Showcase** - Creative portfolio gallery
8. **Kainat Javed Artist Portfolio** - Art portfolio website

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript, TailwindCSS
- **Backend**: Node.js (for live projects)
- **Database**: MongoDB (for applicable projects)
- **Frameworks**: React, Vue.js, Bootstrap
- **Tools**: Git, GitHub Pages

## File Structure

```
kjportfolio/
├── index.html              # Main portfolio page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript functionality
├── projects/               # Portfolio system components
│   ├── portfolio-system.js # Project management system
│   ├── portfolio-styles.css # Portfolio-specific styles
│   └── preview-modal.html   # Project preview modal
├── images/                 # Project thumbnails (in root)
│   ├── business we.png
│   ├── analytical dash.png
│   ├── task_management.png
│   ├── E-commers.png
│   ├── selef defance.png
│   ├── social.png
│   ├── kj portfolio.png
│   └── sdtqui.png
└── README.md               # This file
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/Kainatjaved5/kjportfolio.git
   cd kjportfolio
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. Navigate to `http://localhost:8000` (if using a server)

## Adding New Projects

The portfolio system supports dynamic project addition. You can:

1. **Use the "Add Project via URL" button** in the portfolio section
2. **Edit `projects/portfolio-system.js`** to add projects directly
3. **Projects are stored in localStorage** for persistence

## Customization

- **Colors**: Modify CSS variables in `styles.css`
- **Fonts**: Change font families in the HTML head section
- **Layout**: Adjust grid settings in `projects/portfolio-styles.css`
- **Projects**: Edit the `defaultProjects` array in `projects/portfolio-system.js`

## Deployment

This portfolio is designed for GitHub Pages deployment:

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source as "Deploy from a branch" → "main" → "/ (root)"
4. Your portfolio will be live at `https://username.github.io/repository-name`

## Browser Support

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Lazy loading for images
- Optimized animations
- Efficient DOM manipulation
- Minimal external dependencies
- Fast loading times

## Security Features

- Secure iframe sandboxing for previews
- CSP-friendly design
- No external API dependencies
- Safe external link handling

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Kainat Javed**
- Web Developer & Designer
- [GitHub](https://github.com/Kainatjaved5)
- [Portfolio](https://kainatjaved5.github.io/kjportfolio/)

---

© 2024 Kainat Javed. All rights reserved.
