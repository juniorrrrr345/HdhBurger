# HASHTAG BOT - Next.js Application

This is a Next.js application that reproduces the HASHTAG BOT interface, converted from the original Express.js/EJS version for Vercel deployment.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js App Router pages and components
- `/app/page.tsx` - Main HASHTAG BOT interface
- `/app/admin/page.tsx` - Admin panel for adding products
- `/backup` - Original EJS templates (preserved for reference)
- `/views` - Original EJS templates (preserved for reference)

## Features

- Responsive HASHTAG BOT interface with React and Tailwind CSS
- Admin panel for product management
- Mobile-first design matching the original EJS templates
- Ready for Vercel deployment

## Deployment

The application is configured for Vercel deployment with:
- Next.js 14 with App Router
- TypeScript support
- Tailwind CSS for styling
- Optimized build configuration

## Original Error Resolution

This project was created to resolve a 404 NOT_FOUND error (ID: cdg1::9nx6q-1753229505759-46f6a04f32ac) that occurred when the Next.js conversion was incomplete. All necessary files have been restored and the application should now deploy successfully.