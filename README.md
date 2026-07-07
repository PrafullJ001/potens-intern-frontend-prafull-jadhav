# CivicVoice – Multilingual Civic Issue Reporting PWA

A mobile-first Progressive Web Application (PWA) built for the **Potens Frontend Internship Assignment (Q1)**.

CivicVoice allows citizens to quickly report civic issues by selecting a category, describing the issue using text, image, or voice input, and receiving a unique reference ID. The application supports both **English** and **Marathi**, works on slow networks, and can be installed like a native mobile app.

---

# GitHub Repository

https://github.com/PrafullJ001/potens-intern-frontend-prafull-jadhav

---

# Assignment

Frontend – Q1

Multilingual Civic-Style Progressive Web Application

---

# Features

## Required Features

### Three Screen Flow

- Category Selection
- Issue Details
- Confirmation Screen

---

### Category Selection

Users can report different civic issues.

Available Categories

- Road Damage
- Garbage
- Water Leakage
- Street Light
- Electricity
- Others

---

### Issue Details

Users can

- Enter description
- Upload an image
- Use voice input

---

### Voice Input

Implemented using the Web Speech API.

Users can dictate the issue description using their microphone.

---

### Bilingual Support

Supports

- English
- Marathi

Every label, placeholder, button, and heading changes dynamically.

---

### Confirmation Screen

After submission the application

- Generates a unique reference ID
- Stores the report locally
- Displays a confirmation message

Example Reference ID

CV-7F42D9A1

---

### Local Storage

Reports are stored locally using browser localStorage.

No backend is required.

---

### Progressive Web App (PWA)

Implemented

- Web Manifest
- Service Worker
- Offline page
- Installable application
- Home screen installation

---

### Slow 3G Friendly

Designed to remain usable under Chrome DevTools Slow 3G throttling.

Optimizations include

- Minimal assets
- Cached resources
- Fast repeat loading
- Lightweight UI

---

## Stretch Features

### Offline Queue

When the user submits while offline

- Report is saved locally
- Queued for synchronization
- Automatically processed when the connection returns (simulation using localStorage)

---

### Responsive Design

Optimized for

- Mobile
- Tablet
- Desktop

---

### Micro Interaction

Includes subtle animations using Framer Motion.

Examples

- Category selection animation
- Submit button transition
- Confirmation animation

---

# Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM

Browser APIs

- Web Speech API
- Local Storage API
- Service Worker API

Libraries

- Framer Motion
- React Icons

---

# Folder Structure

```
src
│
├── assets
├── components
├── context
├── data
├── hooks
├── pages
├── routes
├── services
├── utils
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Application Flow

```
Category Selection

↓

Issue Details

↓

Photo Upload

↓

Voice Input

↓

Submit

↓

Generate Reference ID

↓

Confirmation
```

---

# Installation

Clone repository

```bash
git clone https://github.com/PrafullJ001/potens-intern-frontend-prafull-jadhav.git
```

Move into project

```bash
cd potens-intern-frontend-prafull-jadhav
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Design Decisions

Instead of building a feature-heavy application, I focused on delivering a clean, reliable, and user-friendly experience.

Key decisions

- Mobile-first interface
- Reusable React components
- Context API for language management
- Utility-based styling using Tailwind CSS
- Local storage instead of backend
- Lightweight assets for slow networks
- Progressive enhancement through PWA support

---

# Accessibility

The application includes

- Keyboard accessible buttons
- Semantic HTML
- aria-label attributes where appropriate
- Good color contrast
- Responsive layouts

---

# Performance

Optimizations

- Component reuse
- Lazy resource caching
- Lightweight assets
- Minimal bundle size
- Service Worker caching
- Optimized for Slow 3G

---

# Known Limitations

This project intentionally uses localStorage because the assignment specifies that a backend is not required.

Current limitations

- No real backend synchronization
- Offline queue is simulated using localStorage
- Uploaded images remain on the local device
- No live status-tracking view in this version — reference ID and confirmation details are stored, but a dedicated status timeline was not built out for this submission

---

# Future Improvements

If given more development time I would implement

- Real backend using Node.js and Express
- A status tracker view (Submitted → Assigned → In Progress → Resolved) backed by real state instead of a mock
- Push notifications
- User authentication
- GPS location detection
- Map integration
- Cloud image uploads
- Real-time issue tracking
- Admin dashboard
- Analytics dashboard

---

# Lighthouse

(Add Lighthouse screenshot here)

Target

- Performance 90+
- Accessibility 90+
- Best Practices 90+
- SEO 90+

---

# Testing

Tested on

- Google Chrome
- Microsoft Edge

Responsive testing

- Mobile
- Tablet
- Desktop

Network testing

- Online
- Offline
- Slow 3G

---

## AI Use Log

I used **ChatGPT (OpenAI)** and **Claude (Anthropic)** as development assistants throughout this assignment for architecture discussions, debugging, implementation guidance, and documentation. All generated suggestions were reviewed, tested, modified where necessary, and integrated manually before submission.

### Tools Used

- **ChatGPT (OpenAI)**
- **Claude (Anthropic)**

### Where they helped

- Discussing the React project structure and organizing screens, components, context, and services
- Planning the multilingual (English/Marathi) implementation
- Implementing the PWA setup (manifest, service worker, installability)
- Debugging Web Speech API behavior and browser compatibility
- Reviewing localStorage usage and offline support
- Improving UI/UX, accessibility, and responsive design
- Structuring and drafting the project documentation (README)

### What I did myself

- Integrated and customized all features within the application
- Implemented the final component structure, routing, and state management
- Tested the complete application manually, including Slow 3G and offline scenarios
- Verified bilingual support across all screens
- Made the final implementation decisions, UI/UX refinements, and feature scope

I'm comfortable explaining the architecture, implementation decisions, and codebase during an interview. AI tools were used to accelerate development and debugging, not as a replacement for understanding or testing the implementation.

# What I Learned

During this assignment I gained hands-on experience with

- Progressive Web Applications
- Browser APIs
- React Context API
- Service Workers
- Web Speech API
- Mobile-first UI design
- Offline-first concepts
- Structuring scalable React projects

---

# Author

**Prafull Jadhav**

GitHub

https://github.com/PrafullJ001

---

# Thank You

Thank you for reviewing my submission.

This assignment helped me learn practical frontend engineering concepts such as Progressive Web Applications, multilingual interfaces, offline support, and building responsive user experiences.

I appreciate the opportunity and look forward to your feedback.