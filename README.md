# Nile Online Learning Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Vanilla CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)

**Nile Online** is a premium, modern, and highly responsive learning platform designed for Nile University's online and hybrid education offerings. It provides a seamless experience for students to explore degree programs, executive development courses, and professional short courses.

---

## ✨ Key Features

- **🚀 Dynamic Hero Carousel**: A high-impact hero section with automated sliding, category badges, and interactive "floating" stats cards.
- **📚 Integrated Program Explorer**: 
  - **Mock API Integration**: Fetches real-time course/program data from a structured `/api/data.json`.
  - **Category Filtering**: Instantly filters programs by degree, executive, or short course categories.
  - **Interactive Carousel**: Horizontal scrolling program list with navigation controls and auto-looping.
  - **Skeleton Loading**: Graceful loading states for a smooth user experience.
- **💎 Premium Design System**:
  - **Modern Typography**: Uses 'Outfit' for headers and 'Plus Jakarta Sans' for body text.
  - **Rich Aesthetics**: Glassmorphism effects, vibrant brand colors, and curated HSL palettes.
  - **Interactive Animations**: Intersection Observer-based reveal-on-scroll animations and staggered delay effects.
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop viewports with a custom mobile navigation menu.
- **💬 Testimonials**: Dynamic testimonial section with social proof from students and graduates.
- **🏢 Corporate Solutions**: Dedicated section for organizational partnerships and workforce empowerment.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, Grid)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Outfit & Plus Jakarta Sans)

---

## 📦 Project Structure

```bash
nileonline/
├── public/
│   ├── api/
│   │   └── data.json      # Mock API source file
|   ├── hero_man.png       # High-quality assets
|   └── ...
├── src/
│   ├── App.jsx            # Main application logic & layout
│   ├── index.css          # Global styles & design system
│   ├── main.jsx           # Entry point
│   └── components/        # UI components (future separation)
├── package.json           # Dependencies & scripts
└── vite.config.js         # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd nileonline
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎨 Design Principles

The project follows these core design principles:
1. **Clarity**: Information hierarchy is maintained through consistent use of scale and weight.
2. **Engagement**: Micro-interactions and smooth transitions keep the user interested.
3. **Accessibility**: High contrast ratios and semantic HTML for screen readers.
4. **Performance**: Minimal dependencies and optimized asset loading via Vite.

---

## 📄 License

This project is for internal use at Nile University. All rights reserved. &copy; 2026 Nile Online.
