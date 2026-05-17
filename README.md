# InternSphere

A modern, student-friendly internship aggregation platform that brings together internship opportunities from multiple job sources into one centralized, easy-to-use interface.

![InternSphere](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## 🌟 Features

- **Multi-Source Aggregation**: Fetches internships from JSearch (RapidAPI) and Adzuna Job API
- **Advanced Search & Filtering**: Filter by location, source, work mode (remote/hybrid/on-site), and skills
- **Smart Recommendations**: Personalized internship suggestions based on your student profile
- **Student Profile**: Set your year, domain, location, and availability for better recommendations
- **Impact Dashboard**: Visual analytics showing application tracking and skill growth
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Built-in theme toggle for comfortable viewing
- **Real-time Updates**: Hot module replacement for instant development feedback
- **Clean UI**: Modern, minimal interface with smooth animations

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library with hooks for state management
- **Vite 5** - Build tool and dev server with HMR
- **Tailwind CSS v3** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Headless UI** - Accessible UI components
- **React Icons** - Icon library (Feather Icons)

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express 4.x** - Web framework for API server
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### External APIs
- **RapidAPI JSearch** - Job search API
- **Adzuna Job API** - Job aggregation API

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- API keys for JSearch and Adzuna

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
PORT=5000
RAPIDAPI_KEY=your_rapidapi_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
ADZUNA_COUNTRY=us
```

5. Start the backend server:
```bash
node server.js
```

The backend will start on `http://localhost:5000` and log the API endpoint.

### Frontend Setup

1. Navigate to the project root:
```bash
cd InternSphere
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/`

## 🎯 Usage

1. **Search**: Use the search bar to find internships by keyword
2. **Filter**: Apply filters for location, source, work mode, and skills
3. **View Details**: Click on any internship card to see full details
4. **Apply**: Click the "Apply" button to visit the original job posting
5. **Profile**: Set up your student profile for personalized recommendations
6. **Dashboard**: Track your application progress and skill growth

## 📁 Project Structure

```
InternSphere/
├── backend/
│   ├── server.js              # Express server setup
│   ├── routes/
│   │   └── jobs.js            # /api/jobs route handler
│   ├── services/
│   │   ├── jsearchService.js  # JSearch API client
│   │   └── adzunaService.js  # Adzuna API client
│   ├── utils/
│   │   ├── normalizeJob.js    # JSearch normalizer
│   │   └── normalizeAdzunaJob.js  # Adzuna normalizer
│   ├── .env.example           # Environment variables template
│   └── package.json           # Backend dependencies
├── src/
│   ├── App.jsx                # Main app component
│   ├── components/
│   │   ├── Header.jsx         # Fixed header with search
│   │   ├── InternshipCard.jsx # Job listing card
│   │   ├── RoleDetail.jsx     # Job detail modal
│   │   ├── Filters.jsx        # Filter panel
│   │   ├── FiltersInline.jsx  # Inline filters
│   │   ├── FiltersSheet.jsx   # Mobile filter bottom sheet
│   │   ├── ActiveChips.jsx    # Active filter chips
│   │   ├── ResultsHeader.jsx  # Results section header
│   │   ├── Dashboard.jsx      # Impact analytics dashboard
│   │   ├── StudentProfileDialog.jsx  # Student profile modal
│   │   ├── ThemeToggle.jsx    # Dark mode toggle
│   │   ├── SearchBar.jsx      # Search input
│   │   ├── Logo.jsx           # Logo component
│   │   └── EmptyState.jsx     # No results state
│   ├── hooks/
│   │   ├── useFilters.js      # Filter state management
│   │   ├── useStudentProfile.js  # Student profile state
│   │   └── useAnalytics.js    # Analytics tracking
│   ├── utils/
│   │   ├── filter.js          # Filtering logic
│   │   ├── sort.js            # Sorting logic
│   │   ├── recommend.js       # Recommendation algorithm
│   │   └── explain.js         # Job description parsing
│   └── styles/
│       └── index.css          # Global styles
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Frontend dependencies
```

## 🔧 API Endpoints

### Backend

#### `GET /api/jobs`
Fetches internship listings from multiple sources.

**Query Parameters:**
- `q` (required): Search query (e.g., "intern")
- `location` (optional): Filter by location
- `mode` (optional): Filter by work mode (remote/hybrid/on-site)

**Response:**
```json
[
  {
    "id": "unique-id",
    "title": "Software Engineering Intern",
    "company": "Tech Company",
    "location": "San Francisco, CA",
    "mode": "Remote",
    "source": "JSearch",
    "url": "https://example.com/job",
    "postedAt": "2024-01-15T00:00:00Z",
    "description": "Job description...",
    "skills": ["JavaScript", "React", "Node.js"]
  }
]
```

#### `GET /health`
Health check endpoint.

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | No (default: 5000) |
| `RAPIDAPI_KEY` | RapidAPI key for JSearch | Yes |
| `ADZUNA_APP_ID` | Adzuna application ID | Yes |
| `ADZUNA_APP_KEY` | Adzuna application key | Yes |
| `ADZUNA_COUNTRY` | Country code for Adzuna | Yes |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Job data provided by [JSearch API](https://rapidapi.com/jsearch/api/jsearch) and [Adzuna](https://developer.adzuna.com/)
- Built with modern web technologies
- Inspired by the need for a centralized internship search platform

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ for students seeking internships
