🔐 StackGuard Frontend

A secure authentication and configuration management system with multi-page user flow built with React, TypeScript, and Tailwind CSS.

!License
!React
!TypeScript

✨ Features

🔒 Separate Authentication Pages - Dedicated Sign Up and Sign In pages
🛡️ Protected Routes - Authentication-based access control
🔑 Configuration Key Management - Secure key validation (100-1000 characters)
📱 Responsive Design - Works seamlessly on desktop and mobile
✅ Form Validation - Real-time validation with clear error messages
💾 Persistent State - localStorage-based authentication
🎨 Modern UI - Built with shadcn/ui components and Tailwind CSS

🚀 Tech Stack

React 18 - UI framework
TypeScript - Type safety
React Router v6 - Client-side routing
Tailwind CSS v4 - Utility-first styling
shadcn/ui - High-quality component library
Vite - Lightning-fast build tool
Sonner - Beautiful toast notifications

📁 Project Structure

```
├── App.tsx                    # Main app with routing configuration
├── components/
│   ├── SignUpPage.tsx         # User registration page
│   ├── SignInPage.tsx         # User login page
│   ├── ConfigurationPage.tsx  # Configuration key entry
│   ├── DashboardPage.tsx      # Protected dashboard
│   ├── ProtectedRoute.tsx     # Route guard component
│   └── ui/                    # shadcn/ui components (45+ components)
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
└── styles/
    └── globals.css            # Global styles & Tailwind setup
```

🛠️ Installation & Setup

Prerequisites

Node.js 16+ 
npm or yarn

Steps

Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/stackguard-frontend.git
   cd stackguard-frontend
   ```

Install dependencies
   ```bash
   npm install
   ```

Run development server
   ```bash
   npm run dev
   ```

Open in browser
   ```
   http://localhost:5173
   ```

🔑 Application Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Sign Up page | Public |
| `/signin` | Sign In page | Public |
| `/configuration` | Configuration key entry | Requires authentication |
| `/dashboard` | Main dashboard | Requires authentication + config key |

🔐 Configuration Key Requirements

To access the dashboard, users must enter a configuration key that meets these criteria:

✅ Minimum 100 characters
✅ Maximum 1000 characters
✅ Required after successful authentication



