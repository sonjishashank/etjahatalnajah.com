# Vehicle Handover System

A comprehensive Next.js application for managing vehicle handover processes with authentication, file uploads, and admin dashboard.

## Features

- **User Authentication**: Google OAuth integration with NextAuth.js
- **Vehicle Handover Form**: Complete form with file uploads and digital signatures
- **Admin Dashboard**: View, edit, and manage all submissions
- **File Management**: Upload vehicle and accessory pictures
- **Digital Signatures**: Capture handover and takeover signatures
- **Database Integration**: MySQL database with proper schema
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Database Setup

1. Create a MySQL database using the provided schema:
```bash
mysql -u your_username -p < database-schema.sql
```

2. Update the database credentials in `.env.local`

### 4. Environment Variables

Copy `.env.local` and update the following variables:
- Database credentials (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
- Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- NextAuth secret (NEXTAUTH_SECRET)

### 5. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### 6. Run the Application

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to access the application.

## Project Structure

```
├── pages/
│   ├── api/
│   │   ├── auth/[...nextauth].js    # NextAuth configuration
│   │   ├── submit-form.js           # Form submission endpoint
│   │   └── admin/
│   │       ├── users.js             # User management API
│   │       ├── update/[id].js       # Update submission API
│   │       └── delete/[id].js       # Delete submission API
│   ├── admin/
│   │   ├── index.js                 # Admin dashboard
│   │   ├── edit/[id].js            # Edit submission page
│   │   └── view/[id].js            # View submission details
│   ├── auth/
│   │   └── signin.js               # Custom sign-in page
│   ├── index.js                    # Main handover form
│   └── _app.js                     # App wrapper with SessionProvider
├── lib/
│   └── db.js                       # Database connection and queries
├── styles/
│   └── globals.css                 # Global styles with Tailwind
├── database-schema.sql             # Database schema
└── .env.local                      # Environment variables
```

## Usage

### For Users
1. Sign in with Google account
2. Fill out the vehicle handover form
3. Upload vehicle and accessory pictures
4. Add digital signatures
5. Submit the form

### For Admins
1. Sign in with admin account
2. Access admin dashboard via "Admin Panel" button
3. View all submissions with search and filter options
4. Edit or delete submissions as needed
5. View detailed submission information

## Database Schema

The application uses two main tables:
- `users`: Store user authentication and role information
- `vehicle_submissions`: Store all handover form data

## Security Features

- JWT-based authentication with NextAuth.js
- Role-based access control (user/admin)
- File upload validation and security
- SQL injection protection with parameterized queries
- CORS headers configuration

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: MySQL with mysql2 driver
- **File Upload**: Formidable for multipart form handling
- **Digital Signatures**: react-signature-canvas
- **Styling**: Tailwind CSS with responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.