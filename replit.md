# Overview

NOESIS AI is a modern AI automation agency website built as a professional showcase for AI and automation services. The application serves as a comprehensive marketing platform featuring service offerings, case studies, client testimonials, and lead generation capabilities. The site positions NOESIS AI as a premium automation consultancy specializing in workflow automation, AI agents, and business process optimization using tools like n8n, Make, and various AI APIs.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **State Management**: TanStack Query for server state and form management with React Hook Form
- **UI Components**: Comprehensive component library built on Radix UI primitives

## Design System
- **Component Library**: shadcn/ui with custom styling modifications
- **Typography**: Inter and Plus Jakarta Sans from Google Fonts
- **Color Palette**: Professional blue-based theme with deep navy primary (#220 85% 12%) and electric blue accent (#200 100% 50%)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Design Philosophy**: Professional minimalism inspired by Linear, Notion, and Vercel

## Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **Development Setup**: Hot module replacement and development middleware via Vite
- **API Structure**: RESTful endpoints with Express routing

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Definition**: Type-safe schema definitions in shared directory
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## Development Workflow
- **Monorepo Structure**: Client and server code organized in separate directories with shared schemas
- **Type Safety**: Full TypeScript coverage across client, server, and shared code
- **Development Server**: Concurrent client and server development with Vite middleware
- **Build Process**: Separate client (Vite) and server (esbuild) build processes

## Content Strategy
- **Lead Generation**: Multiple conversion points including contact forms, lead magnets, and pricing CTAs
- **SEO Optimization**: Semantic HTML structure with proper meta tags and structured content
- **Content Sections**: Hero, value propositions, process explanation, case studies, testimonials, and pricing tiers
- **Mock Data**: Comprehensive placeholder content for all sections ready for real data integration

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Build Tools**: Vite with React plugin, TypeScript, ESBuild for server bundling
- **Routing**: Wouter for lightweight client-side routing

## UI and Styling
- **Design System**: Complete shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter, Plus Jakarta Sans)

## Backend Infrastructure
- **Server**: Express.js with TypeScript support
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

## Development Tools
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for schema validation
- **Development**: Replit-specific plugins for development environment integration

## Asset Management
- **Images**: Local asset storage with Vite alias configuration
- **Logo**: External asset hosting (assets.noesisai.pro)
- **Generated Content**: AI-generated images and placeholder content for testimonials and case studies