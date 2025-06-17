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





```







### Projects
- Add/edit/delete projects through the admin dashboard
- Upload multiple media files per project
- Organize by project type (architectural, interior, production)
- Add tags for better categorization

### Testimonials
- Manage client testimonials through the admin dashboard
- Include client name, title, rating, and project context
- Auto-rotating carousel on the frontend


### Admin Features
- **Projects Management**: Add, edit, delete projects with media galleries
- **Testimonials Management**: Manage client reviews and ratings
- **Contact Messages**: View and manage contact form submissions
- **Settings**: Customize hero section and change admin credentials
- **Media Upload**: Integrated Cloudinary upload for all media types



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



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions about this project, please contact or create an issue in the repository.
