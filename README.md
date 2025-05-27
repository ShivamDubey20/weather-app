# Weather Application

A modern, responsive weather application built with TypeScript and React, featuring a sophisticated black and white UI design.

## Features

- Real-time weather data display
- API status monitoring
- Error handling with user-friendly messages
- Responsive design for all screen sizes
- Modern UI with smooth animations and transitions
- Sophisticated black and white theme

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-typescript.git
cd weather-typescript
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
weather-typescript/
├── src/
│   ├── components/
│   │   └── weather/
│   │       ├── WeatherDashboard.tsx
│   │       ├── WeatherDashboard.module.css
│   │       ├── ApiStatus.tsx
│   │       ├── ApiStatus.module.css
│   │       ├── ErrorDisplay.tsx
│   │       └── ErrorDisplay.module.css
│   ├── services/
│   │   └── weatherService.ts
│   ├── types/
│   │   └── weather.ts
│   └── App.tsx
├── .env
├── package.json
└── README.md
```

## UI Design Approach

The UI was designed with a focus on creating a sophisticated and professional look while maintaining simplicity and usability. Here's how the design was approached:

### 1. Color Scheme
- Implemented a black and white theme for a timeless, professional appearance
- Used subtle gradients to create depth and visual interest
- Maintained high contrast for better readability

### 2. Visual Hierarchy
- Created clear visual hierarchy through typography and spacing
- Used gradient text effects for important headings
- Implemented subtle shadows and highlights for depth

### 3. Interactive Elements
- Added smooth transitions and animations for better user feedback
- Implemented hover states with elevation changes
- Created micro-interactions for a more engaging experience

### 4. Responsive Design
- Ensured the UI works seamlessly across all screen sizes
- Adjusted spacing and typography for mobile devices
- Maintained visual consistency across different viewports

### 5. Error Handling
- Designed user-friendly error messages
- Implemented clear call-to-action buttons
- Added visual indicators for error states

## CSS Modules

The project uses CSS Modules for scoped styling. Key features include:

- Modular and maintainable CSS
- Scoped class names to prevent conflicts
- Support for modern CSS features
- Responsive design patterns

