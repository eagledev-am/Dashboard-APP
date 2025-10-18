# React Dashboard Application

A modern, feature-rich dashboard application built with React, TypeScript, and Vite. This application provides user management, analytics, and real-time weather information.

## 🚀 Features

- **Authentication System**: Secure login with credential validation
- **User Management**: Browse users, view detailed profiles with posts and todos
- **Analytics Dashboard**: Statistical insights from user data
- **Weather Widget**: Real-time weather information for any city worldwide
- **Todo Management**: Interactive todo list with persistent state
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **State Management**: Context API for global state
- **Data Fetching**: React Query for efficient API calls

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features Documentation](#features-documentation)
- [API References](#api-references)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Troubleshooting](#troubleshooting)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git** (for cloning the repository)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-project/crads-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment variables** (see [Environment Variables](#environment-variables))

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Weather API Key from OpenWeatherMap
VITE_WEATHER_API_KEY=your_openweathermap_api_key

# Admin Credentials
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
```

### Getting Your Weather API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Paste it in the `.env` file

**Note**: The free tier allows 60 calls/minute and 1,000,000 calls/month.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

(These can be changed in the `.env` file)

## 📁 Project Structure

```
crads-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx       # Route protection component
│   ├── context/
│   │   ├── AuthContext.tsx          # Authentication state management
│   │   └── TodoContext.tsx          # Todo state management
│   ├── pages/
│   │   ├── Login.tsx                # Login page
│   │   ├── Dashboard.tsx            # Main dashboard
│   │   ├── UsersList.tsx            # Users list view
│   │   ├── UserDetail.tsx           # Individual user details
│   │   ├── Analytics.tsx            # Analytics page
│   │   └── Weather.tsx              # Weather widget page
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles (Tailwind)
│   └── vite-env.d.ts               # Vite environment types
├── .env                             # Environment variables (not in git)
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
└── README.md                        # This file
```

## 📖 Features Documentation

### 1. Authentication System

**Location**: `src/pages/Login.tsx` | `src/context/AuthContext.tsx`

#### How it works:
- Users enter username and password
- Credentials are validated against environment variables
- On success, user is redirected to dashboard
- Authentication state is managed globally via Context API
- Protected routes redirect unauthenticated users to login

#### Usage:
```typescript
// In any component
import { useAuth } from '../context/AuthContext';

const { isAuthenticated, login, logout } = useAuth();
```

### 2. User & Posts Manager

**Location**: `src/pages/UsersList.tsx` | `src/pages/UserDetail.tsx`

#### Features:
- **Users List**: Displays all users from JSONPlaceholder API
- **User Details**: Shows comprehensive user information
- **Posts**: Lists all posts created by the user
- **Todos**: Interactive todo list with toggle functionality

#### API Endpoints:
- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts?userId={id}`
- Todos: `https://jsonplaceholder.typicode.com/todos?userId={id}`

#### Todo State Management:
Todos can be toggled between completed/incomplete states. The state persists throughout the application lifecycle using Context API.

```typescript
// Toggle a todo
const { toggleTodo } = useTodoContext();
toggleTodo(todoId);
```

### 3. Analytics Dashboard

**Location**: `src/pages/Analytics.tsx`

#### Displays:
- **Total Users**: Count of all users
- **Most Posts**: User with highest post count
- **Fewest Posts**: User with lowest post count
- **Most Completed Todos**: User with most completed tasks
- **Fewest Completed Todos**: User with least completed tasks
- **Total Posts**: Overall post count

#### Data Sources:
- Aggregates data from JSONPlaceholder API
- Calculates statistics in real-time
- Displays results in styled cards

### 4. Weather Widget

**Location**: `src/pages/Weather.tsx`

#### Features:
- City search functionality
- Real-time weather data
- Temperature display (Celsius)
- Weather description
- Humidity percentage
- Weather condition icon
- Error handling for invalid cities

#### Supported Cities:
- Any city recognized by OpenWeatherMap API
- Examples: London, New York, Tokyo, Cairo, Paris, etc.

#### API:
```
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

## 🔌 API References

### JSONPlaceholder API

Base URL: `https://jsonplaceholder.typicode.com`

**Endpoints Used:**
- `GET /users` - Fetch all users
- `GET /users/{id}` - Fetch specific user
- `GET /posts?userId={id}` - Fetch user's posts
- `GET /todos?userId={id}` - Fetch user's todos

### OpenWeatherMap API

Base URL: `https://api.openweathermap.org/data/2.5`

**Endpoints Used:**
- `GET /weather?q={city}&appid={API_KEY}&units=metric` - Current weather

**Response Example:**
```json
{
  "name": "London",
  "main": {
    "temp": 15.5,
    "humidity": 72
  },
  "weather": [
    {
      "description": "clear sky",
      "icon": "01d"
    }
  ]
}
```

## 🛠 Technologies Used

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Routing & State
- **React Router DOM** - Client-side routing
- **React Query (@tanstack/react-query)** - Server state management
- **Context API** - Global state management

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **Vite Plugin React** - React support for Vite

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style Guidelines

1. **Use TypeScript** for all new files
2. **Follow React Hooks** best practices
3. **Use Tailwind CSS** for styling
4. **Keep components small** and focused
5. **Use Context API** for global state
6. **Use React Query** for API calls
7. **Add proper TypeScript types** for all props and state

### Adding New Features

1. Create component in appropriate directory
2. Add types in `src/types/index.ts` if needed
3. Create page component in `src/pages/` if it's a route
4. Add route in `src/App.tsx`
5. Update this documentation

## 🏗 Building for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```
The build output will be in the `dist/` directory.

**Environment Variables:**
Make sure to set all environment variables in your hosting platform:
- `VITE_WEATHER_API_KEY`
- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Check the terminal for server errors
3. Verify all dependencies are installed
4. Ensure environment variables are set correctly
5. Try clearing cache and rebuilding

## 📝 License

This project is for educational purposes.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

For questions or support 📬 [Email Me](mailto:abdo@example.com)
, please open an issue in the repository.
