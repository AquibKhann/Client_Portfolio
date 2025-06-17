# Shaquib Khan - Architect Portfolio

A modern, elegant, and professional portfolio website for an architect specializing in architectural design, interior design, and production design. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Frontend Features
- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Framer Motion animations throughout
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: ARIA roles and keyboard navigation support

### Content Management
- **Dynamic Hero Section**: Customizable background image, name, tagline, and description
- **Project Portfolio**: Showcase architectural, interior, and production design projects
- **Media Gallery**: Support for images, videos, PDFs, and AutoCAD files
- **Testimonials**: Client reviews with ratings and project context
- **Contact Form**: Integrated contact form with email notifications
- **Admin Dashboard**: Full content management system

### Technical Features
- **Supabase Backend**: Database, authentication, and real-time updates
- **Cloudinary Integration**: Professional media upload and management
- **EmailJS Integration**: Automated email notifications
- **TypeScript**: Type-safe development
- **Modern Stack**: Next.js 13+ with App Router

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Media**: Cloudinary
- **Email**: EmailJS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account and project
- A Cloudinary account (optional, for media uploads)
- An EmailJS account (optional, for contact form emails)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd architect-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# EmailJS Configuration (Optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Database Setup

The database schema will be automatically created when you connect to Supabase. The migrations include:

- `projects` table for portfolio projects
- `testimonials` table for client reviews
- `contact_submissions` table for contact form submissions
- `hero_settings` table for homepage customization
- `admin_credentials` table for admin authentication

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. The database schema will be created automatically via migrations
4. Enable Row Level Security (RLS) policies are included for data protection

### Cloudinary Setup (Optional)

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name from the dashboard
3. Create an upload preset named `architect_portfolio` with:
   - Signing Mode: Unsigned
   - Folder: `architect-portfolio` (optional)
   - Allowed formats: jpg, png, pdf, dwg, mp4, etc.

### EmailJS Setup (Optional)

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Get your Service ID, Template ID, and Public Key

## 🎨 Customization

### Hero Section
- Access admin dashboard at `/admin` (Username: `Aquib`, Password: `Khan@123`)
- Go to Settings > Hero Section to customize:
  - Background image
  - Name and tagline
  - Description text
  - CV/Resume file

### Projects
- Add/edit/delete projects through the admin dashboard
- Upload multiple media files per project
- Organize by project type (architectural, interior, production)
- Add tags for better categorization

### Testimonials
- Manage client testimonials through the admin dashboard
- Include client name, title, rating, and project context
- Auto-rotating carousel on the frontend

## 📱 Admin Dashboard

Access the admin dashboard at `/admin` with these default credentials:
- **Username**: `Aquib`
- **Password**: `Khan@123`

### Admin Features
- **Projects Management**: Add, edit, delete projects with media galleries
- **Testimonials Management**: Manage client reviews and ratings
- **Contact Messages**: View and manage contact form submissions
- **Settings**: Customize hero section and change admin credentials
- **Media Upload**: Integrated Cloudinary upload for all media types

### Changing Admin Credentials
1. Log into the admin dashboard
2. Go to Settings > Admin Credentials
3. Update username and password
4. Save changes (you'll need to log in again with new credentials)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── sections/          # Homepage sections
│   ├── ui/                # UI components (shadcn/ui)
│   └── theme-provider.tsx # Theme provider
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   ├── emailjs.ts         # EmailJS integration
│   └── utils.ts           # Utility functions
├── supabase/              # Database migrations
│   └── migrations/        # SQL migration files
└── public/                # Static assets
```

## 🔒 Security

- Row Level Security (RLS) enabled on all database tables
- Admin authentication with secure credential storage
- Input validation and sanitization
- CORS protection
- Environment variable protection

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your Supabase URL and anon key
   - Check if your Supabase project is active
   - Ensure RLS policies are properly configured

2. **Cloudinary Upload Fails**
   - Verify your cloud name is correct
   - Check if upload preset `architect_portfolio` exists
   - Ensure upload preset is set to "unsigned"

3. **EmailJS Not Working**
   - Verify all EmailJS credentials
   - Check email template variables match the code
   - Ensure email service is properly configured

4. **Admin Login Issues**
   - Default credentials: Username `Aquib`, Password `Khan@123`
   - Check browser console for errors
   - Clear browser cache and try again

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure all external services (Supabase, Cloudinary, EmailJS) are properly configured
4. Check the network tab for failed API requests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions about this project, please contact the development team or create an issue in the repository.