# 🌤️ Weather App Frontend

A modern, responsive React weather application built with Vite, TypeScript, and SCSS. Features beautiful animations, real-time weather data, and intelligent search functionality.

## 🚀 Features

- **Real-time Weather Data** - Current weather conditions for any city
- **Beautiful UI/UX** - Modern design with smooth animations using Framer Motion
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smart Search** - Search weather data with autocomplete and suggestions
- **Weather History** - View previously searched weather data
- **Error Handling** - Graceful error handling with user-friendly messages
- **Loading States** - Smooth loading animations and skeleton screens
- **TypeScript** - Full type safety for better development experience
- **SCSS Styling** - Organized and maintainable styling with variables and mixins

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: SCSS/Sass
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Linting**: ESLint
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Weather Backend API** running (see backend repository)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weather-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Backend API Configuration
VITE_WEATHER_API_URL=http://localhost:5000/api/weather

# Production Backend (when deployed)
# VITE_WEATHER_API_URL=https://your-backend-api.com/api/weather
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

## 🎨 Styling Architecture

### SCSS Organization
```scss
// variables.scss - Design tokens
$primary-color: #3b82f6;
$secondary-color: #64748b;
$spacing-md: 1rem;
$border-radius-lg: 0.75rem;

// mixins.scss - Reusable styles
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card {
  background: $bg-card;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  padding: $spacing-lg;
}
```

### Component Styling Pattern
```scss
// Component.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.component-name {
  @include card;
  
  &__element {
    color: $text-primary;
  }
  
  &--modifier {
    background: $primary-color;
  }
}
```

## 🔌 API Integration

### Weather Service (api.ts)
```typescript
export class WeatherApi {
  // Get current weather for a city
  static async getCurrentWeather(city: string): Promise<WeatherData>
  
  // Get all weather history
  static async getAllWeather(): Promise<WeatherData[]>
  
  // Search weather in database
  static async searchWeatherInDB(city: string): Promise<WeatherData[]>
  
  // Test API connection
  static async testConnection(): Promise<boolean>
}
```

### Data Types (types.ts)
```typescript
export interface WeatherData {
  _id: string;
  searchcity: string;
  city: string;
  temperature: number;
  condition: string;
  date: string;
}

export interface WeatherApiError {
  message: string;
  status?: number;
}
```

## 🎭 Components Overview

### 🏠 Header Component
- Beautiful gradient background
- Animated logo and title
- Responsive design
- Glass morphism effects

### 🔍 Weather Search
- Real-time search input
- Loading states
- Error handling
- Search suggestions

### 🌡️ Weather Card
- Current temperature display
- Weather condition
- City information
- Smooth animations

### 📊 Weather History
- Previously searched cities
- Sortable by date
- Pagination support
- Delete functionality

### 🎨 UI Components
- **Button**: Various styles (primary, secondary, loading)
- **Input**: Search input with validation
- **Card**: Reusable card component
- **Loading**: Skeleton screens and spinners

## 📱 Responsive Design

### Breakpoints
```scss
$breakpoint-sm: 640px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 1024px;  // Desktop
$breakpoint-xl: 1280px;  // Large desktop
```

### Mobile-First Approach
```scss
.component {
  // Mobile styles (default)
  font-size: 1rem;
  
  @include responsive($breakpoint-md) {
    // Tablet styles
    font-size: 1.125rem;
  }
  
  @include responsive($breakpoint-lg) {
    // Desktop styles
    font-size: 1.25rem;
  }
}
```

## 🎬 Animations

### Framer Motion Integration
```typescript
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

<motion.div {...fadeIn}>
  Weather Content
</motion.div>
```

### Animation Variants
- **Page Transitions**: Smooth page loading
- **Card Animations**: Hover and click effects
- **Loading States**: Skeleton animations
- **Search Results**: Staggered list animations

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🌐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_WEATHER_API_URL` | Backend API URL | Yes | `http://localhost:5000/api/weather` |

### Environment Files
- `.env` - Default environment variables
- `.env.local` - Local overrides (git ignored)
- `.env.production` - Production variables
- `.env.development` - Development variables

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository** to Vercel
2. **Set Environment Variables** in Vercel dashboard:
   ```
   VITE_WEATHER_API_URL=https://your-backend-api.com/api/weather
   ```
3. **Deploy** - Automatic deployment on push

### Manual Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Other Deployment Options

#### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

#### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🔧 Configuration

### Vite Configuration (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search for weather in different cities
- [ ] Check responsive design on mobile/tablet
- [ ] Verify error handling with invalid cities
- [ ] Test weather history functionality
- [ ] Check loading states
- [ ] Verify animations work smoothly

### Common Issues

1. **API Connection Failed**
   ```
   Solution: Check VITE_WEATHER_API_URL in .env file
   Verify backend server is running
   ```

2. **Build Errors**
   ```
   Solution: Run 'npm run lint' to check for errors
   Check TypeScript compilation: 'npx tsc --noEmit'
   ```

3. **Styling Issues**
   ```
   Solution: Check SCSS compilation
   Verify import paths in component files
   ```

4. **Environment Variables Not Working**
   ```
   Solution: Ensure variables start with 'VITE_'
   Restart development server after .env changes
   ```

### Debug Mode

Enable detailed logging:
```typescript
// Add to main.tsx for development
if (import.meta.env.DEV) {
  console.log('🔍 Development mode enabled');
  console.log('API URL:', import.meta.env.VITE_WEATHER_API_URL);
}
