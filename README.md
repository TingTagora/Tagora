# Tagora - Job Application Website

A modern, production-ready job application website built with React, Tailwind CSS, and Firebase. Features a dark theme with smooth animations, comprehensive application management, and real-time data storage.

## 🚀 Features

- **Modern Design**: Professional dark theme with clean, responsive UI
- **Firebase Authentication**: Secure email/password authentication system
- **Firestore Database**: Real-time job application storage and management
- **User Dashboard**: Track application status and manage profile
- **Application Form**: Comprehensive form with validation and file uploads
- **Analytics**: Track user interactions with Firebase Analytics
- **Responsive Layout**: Works perfectly on all devices
- **Real-time Updates**: Live application status updates

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Analytics, Storage)  
- **Database**: Cloud Firestore
- **Deployment**: Ready for Vercel, Netlify, or Firebase Hosting
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Routing**: React Router DOM

## 🔒 Environment Setup

### Security First
This project uses environment variables to protect sensitive Firebase configuration. 

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Firebase configuration:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing
   - Go to Project Settings > General > Your apps
   - Copy the Firebase SDK configuration

3. **Update your `.env` file:**
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Enable Firebase services:**
   - Authentication > Sign-in method > Email/Password
   - Firestore Database > Create database
   - Analytics (optional)
- **Smooth Animations**: Framer Motion powered animations
- **Form Validation**: React Hook Form with Yup schema validation
- **Protected Routes**: Authentication-based route protection

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom dark theme
- **Authentication**: Firebase Auth (modular SDK v9+)
- **Form Management**: React Hook Form + Yup validation
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Toastify

## 🎨 Design System

The website follows a consistent dark theme color palette:
- Background: `#0f172a`
- Cards: `#1e293b`
- Primary: `#3b82f6`
- Text: `#94a3b8`
- Text Light: `#cbd5e1`
- Borders: `#334155`

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx     # Navigation with scroll spy
│   ├── Hero.jsx       # Hero section with animations
│   ├── About.jsx      # About section
│   ├── Skills.jsx     # Skills showcase
│   └── ...
├── pages/             # Full page components
│   ├── Login.jsx      # Authentication page
│   └── ...
├── context/           # React Context providers
│   └── AuthContext.jsx
├── routes/            # Route protection
│   └── PrivateRoute.jsx
├── firebase.js        # Firebase configuration
└── utils/             # Utility functions
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-application-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Copy your Firebase config
   - Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add a web app to your project

2. **Enable Authentication**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Configure authorized domains

3. **Security Rules**
   - The app uses client-side authentication
   - Ensure proper security rules are configured for your use case

## 📱 Sections Overview

1. **Hero Section**: Developer introduction with download resume and apply buttons
2. **About Section**: Professional summary with statistics
3. **Skills Section**: Technology stack with animated progress bars
4. **Projects Section**: Portfolio showcase (to be implemented)
5. **Experience Section**: Work history timeline (to be implemented)
6. **Education Section**: Academic background (to be implemented)
7. **Contact Section**: Application form (to be implemented)

## 🔒 Authentication Features

- Email/Password authentication
- Protected routes for application submission
- User state management with React Context
- Automatic logout handling
- Password reset functionality
- Form validation and error handling

## 📝 Development Notes

- Uses Vite for fast development and building
- Follows modern React patterns with hooks
- Implements responsive design principles
- Uses semantic HTML for accessibility
- Includes proper error boundaries and loading states

## 🚀 Deployment

The project is ready for deployment to any static hosting service:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
