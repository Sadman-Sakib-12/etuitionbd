
# eTuitionBD
  <div><img src="https://i.ibb.co.com/N2rGmBrw/Annotation-2026-04-14-185750.jpg" width="100%" alt="Banner" /></div>
A full-stack tuition management platform connecting students with verified tutors in Bangladesh.

**Live Site:** https://etuitionbd-b71b0.web.app

---

## Features

### General
- Home page with hero section, latest tuition posts, featured tutors, testimonials, blog preview, FAQ, and stats
- Browse all approved tuition posts with search (subject, location, level) and salary sort
- Browse verified tutors with search by name, subject, or location
- Pagination on tuition and tutor listing pages
- AI Chatbot support
- Blog section with preview
- Responsive design with dark mode support

### Authentication
- Email/password login and registration
- Google OAuth sign-in
- Role selection on registration (Student / Tutor)
- Demo credentials for Student, Tutor, and Admin roles
- Protected routes via `PrivateRouter`

### Student Dashboard
- Post new tuition requests (subject, level, salary, location, mode, schedule)
- View and manage posted tuitions
- Track applied tutors
- Payment history

### Tutor Dashboard
- Apply to tuition posts
- Manage applications (edit/delete pending or rejected)
- View ongoing tuitions
- Revenue history

### Admin Dashboard
- User management — view, edit role/status, delete users
- Tuition management — approve/reject tuition posts
- Reports & analytics with bar and line charts
- Blog post management
- Platform overview with stats (users, tuitions, tutors, payments, revenue)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, DaisyUI |
| Routing | React Router v7 |
| State / Data | TanStack Query v5 |
| Auth | Firebase v12 |
| Forms | React Hook Form |
| Charts | Recharts, Chart.js |
| Animations | Framer Motion |
| HTTP | Axios |
| Alerts | SweetAlert2, React Hot Toast |
| Rich Text | React Quill New |
| Icons | Lucide React, React Icons |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project
- Backend API running (set `VITE_API_URL` in `.env.local`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── componet/          # Reusable UI components
│   ├── Dashboard/     # Dashboard navbar & sidebar menus
│   └── Modal/         # Apply, Edit, and User modals
├── context/           # Auth context and provider
├── firebase/          # Firebase config
├── hooks/             # useAuth, useAxiosSecure, useRole
├── Layouts/           # Page layouts
├── Pages/
│   ├── Dashboard/
│   │   ├── Admin/     # UserManagement, TuitionManagement, Analytics, Blog
│   │   ├── Common/    # Overview, ProfileSettings
│   │   ├── Student/   # PostTuition, MyTuitions, AppliedTutors
│   │   ├── Tutor/     # MyApplications, OngoingTuition, Revenue
│   │   └── Payment/   # PaymentHistory, PaymentSuccess
│   └── ...            # Home, Login, Register, Tutors, Tuitions, etc.
├── Providers/         # PrivateRouter
├── routes/            # App router config
└── utils/             # Utility functions
```

---

## Roles

| Role | Access |
|---|---|
| Student | Post tuitions, track applied tutors, payments |
| Tutor | Apply to tuitions, manage applications, revenue |
| Admin | Full platform control — users, tuitions, analytics |
