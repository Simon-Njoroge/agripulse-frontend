# 🌾 AgriPulse - Field Monitoring Dashboard

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack%20Router-8.x-EF4444?logo=react)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-EF4444?logo=react)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 📋 Overview

**AgriPulse Field Monitoring Dashboard** is a modern, production-ready React frontend for intelligent agricultural field monitoring and management. It provides intuitive role-based dashboards for farm coordinators (Admins) and field agents to track crop progress, manage field assignments, monitor risks, and drive data-driven decisions in modern farming operations.

### 🎯 Key Features

- **Role-Based Dashboards** - Separate Admin and Agent dashboards with tailored workflows
- **Real-Time Field Tracking** - Live field status updates, stage tracking, and lifecycle management
- **Smart Risk Alerts** - Visual indicators and alerts for at-risk fields requiring immediate attention
- **Agent Performance Metrics** - Performance scoring, completion rates, and agent rankings
- **Responsive Design** - Mobile-first responsive layout that works seamlessly across all devices
- **Dark Mode Support** - Built-in dark mode toggle for comfortable usage in any lighting condition
- **Advanced Data Visualization** - Interactive charts for trends, distribution, and comparative analysis
- **Form Validation** - Robust client-side validation with React Hook Form and Zod schemas
- **Server State Management** - TanStack Query for efficient caching and synchronization with backend
- **Fast Performance** - Vite-powered builds with hot module replacement for rapid development
- **TypeScript Safety** - Full type safety throughout the application for better developer experience

---

## 🏗️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | React 18.x | Modern UI library with hooks |
| **Language** | TypeScript 5.x | Type-safe JavaScript development |
| **Routing** | TanStack Router 8.x | File-based, type-safe routing |
| **State Management** | TanStack Query 5.x | Server state caching & sync |
| **Local State** | Zustand | Lightweight auth state management |
| **Forms** | React Hook Form 7.x | Performant, flexible form handling |
| **Validation** | Zod 4.x | TypeScript-first schema validation |
| **Styling** | Tailwind CSS 4.x | Utility-first CSS framework |
| **Charts** | Recharts 3.x | Composable charting library |
| **Icons** | Lucide React 0.5+ | Modern icon library |
| **HTTP Client** | Axios 1.x | Promise-based HTTP client |
| **Build Tool** | Vite 8.x | Next-generation frontend tooling |
| **Testing** | Vitest 3.x | Fast unit testing framework |
| **Linting** | ESLint | Code quality and consistency |
| **Formatting** | Prettier | Automated code formatting |

---

## 📁 Project Structure

```
client/
├── src/
│   ├── api/                          # API service layer
│   │   ├── api.ts                   # Axios configuration & interceptors
│   │   ├── auth.service.ts          # Authentication endpoints
│   │   ├── field.service.ts         # Field CRUD & management
│   │   ├── dashboard.service.ts     # Dashboard data fetching
│   │   ├── field-update.service.ts  # Field update/notes
│   │   └── user.service.ts          # User & agent queries
│   │
│   ├── routes/                       # TanStack Router file-based routes
│   │   ├── __root.tsx               # Root layout with QueryClientProvider
│   │   ├── index.tsx                # Landing page / auth redirect
│   │   ├── admin.tsx                # Admin layout wrapper
│   │   ├── admin/
│   │   │   ├── dashboard.tsx        # Admin dashboard with KPIs
│   │   │   ├── fields.tsx           # Admin fields management
│   │   │   ├── fields/
│   │   │   │   ├── create.tsx       # Create field form
│   │   │   │   └── $fieldId/
│   │   │   │       └── edit.tsx     # Edit field form
│   │   │   └── agents.tsx           # Agent management
│   │   ├── agent.tsx                # Agent layout wrapper
│   │   ├── agent/
│   │   │   ├── dashboard.tsx        # Agent dashboard & metrics
│   │   │   ├── fields.tsx           # Agent's assigned fields
│   │   │   └── fields/
│   │   │       └── $fieldId.tsx     # Field details & updates
│   │   ├── auth/
│   │   │   ├── login.tsx            # Login page
│   │   │   └── signup.tsx           # Signup page
│   │   └── router.tsx               # Router configuration
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts               # Auth mutations & queries
│   │   ├── useFields.ts             # Field queries & filters
│   │   ├── useDashboard.ts          # Dashboard data hooks
│   │   ├── useFieldUpdates.ts       # Field updates queries
│   │   └── useAgents.ts             # Agent listing
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── AdminLayout.tsx          # Admin sidebar & navigation
│   │   ├── AgentLayout.tsx          # Agent sidebar & navigation
│   │   ├── StatCard.tsx             # Dashboard stat card
│   │   ├── Charts.tsx               # Chart components (Line, Pie, Bar)
│   │   ├── FieldForm.tsx            # Field create/edit form
│   │   ├── LandingPage.tsx          # Landing page
│   │   └── ForceLoginModal.tsx      # Force login modal dialog
│   │
│   ├── store/                        # State management
│   │   └── authStore.ts             # Zustand auth store
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── auth.types.ts            # All API types & enums
│   │
│   ├── utils/                        # Utility functions
│   │   ├── helpers.ts               # Formatters & label mappings
│   │   └── schemas.ts               # Zod validation schemas
│   │
│   ├── common/                       # Common utilities
│   │   └── common.ts                # API base URL & constants
│   │
│   ├── styles.css                   # Global styles & Tailwind imports
│   ├── router.tsx                   # Router setup
│   ├── app.tsx                      # Root component
│   └── main.tsx                     # Application entry point
│
├── public/
│   ├── manifest.json                # PWA manifest
│   └── robots.txt                   # SEO robots file
│
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── package.json                     # Dependencies & scripts
├── pnpm-lock.yaml                   # Locked dependencies
├── README.md                        # This file
└── .eslintrc.js                     # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **pnpm** >= 10.x (recommended) or **npm** >= 9.x ([Install pnpm](https://pnpm.io/installation))
- **Git** (for cloning the repository)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/your-org/agripulse-frontend.git
cd agripulse-frontend
```

#### 2. Install Dependencies

Using **pnpm** (recommended):
```bash
pnpm install
```

Or using **npm**:
```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#-environment-variables) section).

#### 4. Start Development Server

```bash
pnpm run dev
```

Server will start on `http://localhost:3001` (or `http://localhost:5173` if port 3001 is unavailable)

```
✓ VITE v8.0.10 ready in 8513 ms
✓ Local: http://localhost:3001/
✓ Ready to accept connections
```

#### 5. Login to Dashboard

Open `http://localhost:3001` and login with demo credentials:

**Admin Account:**
- Email: `mukirisimon22@gmail.com`
- Password: `password123`

**Agent Account:**
- Email: `mukiri.16030@students.kyu.ac.ke`
- Password: `password123`

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1

# App Configuration
VITE_APP_NAME=AgriPulse
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_DEVTOOLS=true

# Debugging
VITE_DEBUG=false
```

### Environment Variable Descriptions

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Yes | `http://localhost:3000/api/v1` | Backend API base URL |
| `VITE_APP_NAME` | No | `AgriPulse` | Application display name |
| `VITE_APP_VERSION` | No | `1.0.0` | Application version |
| `VITE_ENABLE_DARK_MODE` | No | `true` | Enable dark mode support |
| `VITE_ENABLE_DEVTOOLS` | No | `true` | Enable TanStack devtools (dev only) |
| `VITE_DEBUG` | No | `false` | Enable debug logging |

---

## 📦 Available Scripts

```bash
# Development
pnpm run dev              # Start dev server with hot reload
pnpm run build            # Build for production
pnpm run preview          # Preview production build locally

# Testing & Quality
pnpm run test             # Run unit tests
pnpm run test:watch       # Run tests in watch mode
pnpm run lint             # Run ESLint
pnpm run format           # Format code with Prettier
pnpm run check            # Format + lint (auto-fix)
```

---

## 🔑 Key Features Explained

### 1. **Role-Based Dashboards**

#### Admin Dashboard
- **KPI Cards**: Total fields, active fields, at-risk fields, completed fields
- **Trend Charts**: Weekly field updates and new fields created
- **Distribution Chart**: Crop type distribution across fields
- **Agent Performance**: Rankings, completion rates, top performers
- **At-Risk Alerts**: Fields needing immediate attention
- **Recent Activity**: Latest field updates and system events

#### Agent Dashboard
- **Performance Metrics**: Personal score, completion %, ranking
- **Weekly Activity**: Field updates timeline
- **At-Risk Fields**: Alerts for fields requiring attention
- **Pending Tasks**: Actionable items for the agent
- **Recent Updates**: Latest updates on assigned fields

### 2. **Field Management**

**Admin Capabilities:**
- Create new fields with crop type, location, and area
- Edit field details and status
- Assign fields to agents
- Update field lifecycle stages
- Delete fields

**Agent Capabilities:**
- View assigned fields in card grid
- Filter by status and crop type
- Update field stage (planting → growth → flowering → harvesting)
- Add field notes/updates
- View field history and timeline

### 3. **Real-Time Synchronization**

- **TanStack Query** automatically handles:
  - Server state caching with configurable stale time
  - Background refetching
  - Automatic cache invalidation
  - Offline support with cache persistence
  - Optimistic updates for mutations

### 4. **Form Validation**

All forms use **React Hook Form + Zod** for:
- Client-side validation before API calls
- Type-safe schema definitions
- Clear error messages
- Reusable validation schemas

Example schemas in `src/utils/schemas.ts`:
```typescript
createFieldSchema
updateFieldStageSchema
addFieldNoteSchema
assignFieldSchema
```

### 5. **Authentication Flow**

1. User enters credentials on login page
2. Backend authenticates and returns JWT tokens
3. Tokens stored in localStorage
4. HTTP-only cookie automatically sent with each request
5. On token expiration, automatic refresh using refresh token
6. Force login available to terminate previous sessions

---

## 🎨 Styling & Theme

### Tailwind CSS

Project uses **Tailwind CSS 4.x** with:
- Utility-first approach
- Responsive breakpoints
- Dark mode support
- Custom color schemes
- Pre-configured spacing and sizing

### Color Scheme

**Light Mode** (Default)
- Primary: Blue-600
- Success: Green-600
- Warning: Yellow-500
- Danger: Red-600

**Dark Mode**
- Automatic background/text color inversion
- Maintained contrast ratios

### Icons

Uses **Lucide React** for consistent, scalable SVG icons:
```typescript
import { LayoutDashboard, Leaf, LogOut, AlertCircle } from 'lucide-react';
```

---

## 📊 Data Visualization

### Recharts Integration

The `src/components/Charts.tsx` component provides:

**Line Chart (TrendChart)**
- Multi-line trends
- Used for: Weekly updates, new fields timeline

**Pie Chart (DistributionChart)**
- Category distribution
- Used for: Crop type distribution, status breakdown

**Bar Chart (BarChartComponent)**
- Comparative analysis
- Used for: Agent performance, field metrics

---

## 🔄 API Integration

### Service Layer Architecture

All API communication goes through dedicated service files:

```typescript
// src/api/field.service.ts
export const fieldService = {
  getAdminFields(page, limit, filters) { ... },
  getMyFields(page, limit) { ... },
  createField(data) { ... },
  updateField(id, data) { ... },
  updateFieldStage(id, stage) { ... },
  assignField(id, agentId) { ... },
  deleteField(id) { ... },
}
```

### Custom Hooks for Data Fetching

```typescript
// Hook usage in components
const { data, isLoading, error } = useFields({ page: 1, status: 'active' });
const { data: dashboard } = useDashboard();
const { mutate: updateStage } = useUpdateFieldStage();
```

---

## 🧪 Testing

### Run Tests

```bash
pnpm run test              # Run all tests once
pnpm run test:watch        # Run tests in watch mode
```

### Test Structure

Tests located alongside components:
```
src/
├── components/
│   ├── StatCard.tsx
│   ├── StatCard.test.ts
│   └── ...
└── hooks/
    ├── useAuth.ts
    ├── useAuth.test.ts
    └── ...
```

---

## 🔒 Security Features

### Client-Side Security

- **XSS Protection**: React's built-in XSS prevention through JSX
- **CSRF Protection**: HTTP-only cookies prevent token theft
- **Secure Headers**: Content-Security-Policy configuration in Vite
- **Input Validation**: Client-side validation with Zod schemas
- **Secure Storage**: Tokens stored in localStorage (consider httpOnly alternatives)

### Authentication Security

- **JWT Authentication**: Stateless token-based auth
- **Token Refresh**: Automatic refresh before expiration
- **Session Termination**: Force logout capability
- **Role-Based Access**: Route guards prevent unauthorized access

---

## 🐛 Troubleshooting

### Issue: Cannot Connect to API

**Error:** `fetch failed` or `Connection refused`

**Solution:**
- Verify backend server is running on `http://localhost:3000`
- Check `VITE_API_BASE_URL` in `.env` matches backend URL
- Ensure no firewall blocking localhost connections

```bash
# Test backend is running
curl http://localhost:3000/api/v1/auth/me
```

### Issue: Login Fails with 401

**Error:** `Unauthorized` or `Invalid credentials`

**Solution:**
- Verify credentials are correct in `.env` demo account section
- Check backend JWT_SECRET is set
- Ensure refresh token is stored in localStorage

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Verify backend has correct `CORS_ORIGIN` set
- Ensure `withCredentials: true` in API configuration
- Check backend is running on correct port

### Issue: Port Already in Use

**Error:** `error listen EADDRINUSE :::3001`

**Solution:**
```bash
# Use different port
pnpm run dev -- --port 3002

# Or kill process using port
# Windows: taskkill /F /IM node.exe
# macOS/Linux: lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill
```

### Issue: Hot Module Replacement (HMR) Not Working

**Error:** Changes not reflecting in browser

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard reload page (Ctrl+Shift+R)
- Restart dev server: `pnpm run dev`

---

## 📁 File Naming Conventions

- **Components**: PascalCase (e.g., `AdminLayout.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase with `.service` suffix (e.g., `auth.service.ts`)
- **Types**: PascalCase or UPPER_SNAKE_CASE for enums (e.g., `auth.types.ts`)
- **Utils**: camelCase (e.g., `helpers.ts`)

---

## 🎯 Performance Optimization

### Built-in Optimizations

1. **Vite Code Splitting** - Automatic chunk splitting for faster loads
2. **TanStack Query Caching** - Prevents unnecessary API calls
3. **React.lazy() Routes** - Lazy load route components
4. **Tree Shaking** - Remove unused code from production builds
5. **Minification** - Production builds automatically minified

### Monitoring Performance

```bash
# Build and analyze bundle size
pnpm run build
# Check output in dist/

# Useful: Install npm package to visualize
npm install -g vite-plugin-visualizer
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style & Guidelines

- Follow ESLint configuration
- Format code with Prettier before committing
- Use TypeScript for all new code
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Support & Contact

For issues, feature requests, or questions:

- **Issue Tracker:** [GitHub Issues](https://github.com/your-org/agripulse-frontend/issues)
- **Email:** support@agripulse.app
- **Documentation:** [Full Docs](./docs)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [TanStack](https://tanstack.com/) - Router, Query, and Table libraries
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- The open-source community for amazing tools

---



*Last Updated: April 2026*
