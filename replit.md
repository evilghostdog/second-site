# Mira Seltzer - Premium Sparkling Beverage E-Commerce Site

## Overview

Mira is a premium sparkling alcoholic beverage brand focused on clean ingredients, zero sugar, and sophisticated flavors. This is a complete e-commerce application featuring an age gate, product showcase, shopping cart, and secure payment processing. The application presents a modern, wellness-focused alcoholic beverage with four distinct flavors: Mango-Chili, Cucumber-Lime, Hibiscus-Ginger, and Grapefruit-Rosemary.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **UI Framework**: Radix UI components with shadcn/ui for consistent, accessible design
- **Styling**: Tailwind CSS with custom design system featuring warm neutrals and flavor-specific gradients
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state
- **Build Tool**: Vite with custom configuration for development and production builds

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Payment Processing**: Stripe integration for secure payment handling with webhook support
- **API Structure**: RESTful endpoints with `/api` prefix and centralized error handling
- **Development Setup**: Hot module replacement with Vite integration for seamless development

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User management system with username/password authentication
- **Validation**: Zod schemas for type-safe data validation and transformation
- **Migrations**: Drizzle-kit for database schema management and migrations

### Component Architecture
- **Design System**: Custom Tailwind configuration with Mira brand colors and gradients
- **Component Library**: Comprehensive UI components including age gate, product showcase, shopping cart, checkout forms, payment processing, and admin dashboard
- **E-Commerce Features**: Product catalog, shopping cart with persistent storage, secure checkout flow, order confirmation, and business analytics
- **Admin Dashboard**: Complete business management interface with order tracking, revenue analytics, product management, and Stripe integration monitoring
- **Responsive Design**: Mobile-first approach with responsive breakpoints and adaptive layouts
- **State Management**: React Context for cart management with localStorage persistence
- **Animations**: CSS-based animations for enhanced user experience including floating elements and fade-in effects
- **Onboarding System**: Interactive tour with tooltips, highlighting key features, progress tracking, and personalized guidance for first-time users

### Authentication & Age Verification
- **Age Gate**: Session-based age verification that prevents underage access to alcoholic beverage content
- **Session Management**: Browser sessionStorage for maintaining age verification status
- **Redirect Logic**: Automatic redirection for underage users to external safe sites

### User Experience Features
- **Interactive Onboarding Tour**: Multi-step guided tour with tooltips highlighting key features
- **Tour Management**: Context-based tour state management with localStorage persistence
- **Progressive Disclosure**: Smart positioning system that highlights elements and provides contextual information
- **Accessibility**: Keyboard navigation support and screen reader friendly tour components
- **Tour Controls**: Skip, previous/next navigation, progress indicators, and manual tour restart functionality

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database adapter for PostgreSQL connections
- **drizzle-orm**: TypeScript ORM for database operations and query building
- **@tanstack/react-query**: Server state management and data fetching library
- **express**: Web application framework for Node.js backend services

### UI and Styling
- **@radix-ui/react-***: Comprehensive accessible component primitives for dialogs, forms, navigation
- **tailwindcss**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library for consistent iconography

### Development Tools
- **vite**: Fast build tool and development server with HMR support
- **tsx**: TypeScript execution engine for Node.js development
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment
- **wouter**: Lightweight routing library for single-page applications

### Form and Validation
- **react-hook-form**: Performant forms library with validation support
- **@hookform/resolvers**: Validation resolver adapters for react-hook-form
- **zod**: TypeScript-first schema validation library

### Utilities
- **date-fns**: Modern date utility library for JavaScript
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: URL-friendly unique string ID generator