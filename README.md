# Fake News Analyzer

A comprehensive web-based platform for analyzing and validating news content against trusted sources to combat misinformation.

## Overview

The Fake News Analyzer helps users verify the authenticity of news content by cross-referencing it with administrator-configured trusted sources. The system processes multiple content formats including text, images, and videos to provide comprehensive fact-checking capabilities.

## Tech Stack

- **Framework**: T3 Stack (Next.js, TypeScript, tRPC)
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## Core Features

### Dynamic Truth Source Management

**Administrator-Controlled Trusted Sources**
- Admin dashboard for managing trusted news sources and fact-checkers
- Legal compliance through operator responsibility model
- All verification outputs clearly state "Verified by [Organization Name] source"
- Complete audit trail for source modifications and validations

### Multi-Format Content Analysis

**Supported Input Types:**
- **News URLs**: Automatic content fetching with intelligent parsing
  - Primary method: Standard HTTP requests
  - Fallback: Agent-based fetching for dynamic/JavaScript-heavy pages
- **Raw Text**: Direct article text input and analysis
- **Images/Screenshots**: OCR-powered text extraction and analysis
- **Video Content**: Speech-to-text processing for TikTok, news clips, and social media videos

### Content Processing Pipeline

**Unified Text Extraction**
- OCR (Optical Character Recognition) for image-based content
- Speech-to-text conversion for audio/video content
- Intelligent web scraping with dynamic content handling
- Metadata preservation (timestamps, sources, authors)
- Multi-language support

### Validation Engine

**Cross-Reference Analysis**
- Real-time comparison against trusted source database
- Content similarity detection and contradiction identification
- Visual highlighting of differences and discrepancies
- Confidence scoring and reliability assessment
- Detailed validation reports with source attribution

## Database Schema

Built with Prisma ORM supporting:
- User management and authentication
- Trusted source configuration
- Content analysis history
- Validation results and reports
- Admin audit logs

## API Architecture

**tRPC-Powered Backend**
- Type-safe API endpoints
- Real-time validation processing
- Secure admin operations
- Content fetching and analysis services
- File upload and processing handlers

## Legal Compliance

**Operator Responsibility Model**
- Admin-controlled source verification ensures legal protection
- Clear attribution requirements for all validation results
- Comprehensive audit trails for transparency
- Compliance with fact-checking industry standards

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd fake-news-analyzer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Set up database
npx prisma db push
npx prisma generate

# Run development server
npm run dev
```

### Environment Variables

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
# Add OCR and speech-to-text API keys
```

## Development

### Database Management

```bash
# Reset database
npx prisma db reset

# View database in browser
npx prisma studio

# Deploy schema changes
npx prisma db push
```

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Key Security Features

- Admin-only access to truth source management
- Secure file upload handling
- Rate limiting on analysis requests
- Input sanitization and validation
- Audit logging for all administrative actions

## Future Enhancements

- Advanced ML-based content similarity detection
- Real-time fact-checking browser extension
- API access for third-party integrations
- Multi-tenant support for organizations
- Advanced reporting and analytics dashboard

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

[License to be determined]

---

**Built with T3 Stack for type safety, performance, and developer experience in the fight against misinformation.**
