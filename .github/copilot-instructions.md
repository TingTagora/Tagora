# Copilot Instructions for Job Application Website

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern job application website built with React, Tailwind CSS, and Firebase authentication. The project follows a dark theme design pattern with specific color schemes and component architecture.

## Code Style and Conventions
- Use functional components with React hooks
- Follow the established dark theme color palette: #0f172a (background), #1e293b (cards), #3b82f6 (primary), #94a3b8 (text)
- Use Framer Motion for animations
- Implement responsive design with Tailwind CSS classes
- Use React Hook Form with Yup validation for forms
- Follow the modular component structure in the components/ directory

## Architecture Patterns
- Components are organized by functionality (Navbar, Hero, About, Skills, etc.)
- Pages contain full page components (Login, SignUp, etc.)
- Context API is used for authentication state management
- Private routes protect authenticated-only content
- Firebase v9+ modular SDK for authentication and storage

## Specific Guidelines
- Always use motion components from Framer Motion for animations
- Use the predefined CSS classes (btn-primary, btn-secondary, card, input-field, etc.)
- Maintain consistent spacing with section-padding and container-max-width classes
- Include proper accessibility attributes (ARIA labels, keyboard navigation)
- Use environment variables for Firebase configuration
- Implement proper error handling with toast notifications

## File Structure
- `/src/components/` - Reusable UI components
- `/src/pages/` - Full page components
- `/src/context/` - React Context providers
- `/src/routes/` - Route protection components
- `/src/utils/` - Utility functions
- `/src/assets/` - Static assets

## Dependencies Used
- React with Vite
- Tailwind CSS for styling
- Firebase for authentication and storage
- React Hook Form + Yup for form handling
- React Router DOM for navigation
- Framer Motion for animations
- React Icons for iconography
- React Toastify for notifications
