# IT Helpdesk Web Application

A comprehensive IT helpdesk web application with Microsoft Entra ID authentication, Q&A functionality, knowledge base search, Zendesk ticket integration, and automated UI testing.

## Features

### 🔐 Authentication
- **Microsoft Entra ID (Azure AD) Integration**: Secure authentication using MSAL (Microsoft Authentication Library)
- Single Sign-On (SSO) support
- Session management

### 💬 Q&A Assistant
- Interactive question and answer interface
- Instant responses to common IT questions
- Conversation history tracking
- Smart keyword matching for accurate responses

### 📚 Knowledge Base
- Searchable knowledge base articles
- Category-based organization
- Tag-based filtering
- Detailed article view with modal dialogs
- Pre-populated with common IT help topics:
  - Password reset procedures
  - VPN connection troubleshooting
  - Software installation requests
  - Email setup guides
  - Printer connection issues

### 🎫 Zendesk Integration
- Create support tickets directly from the portal
- Track ticket status and priority
- View all user tickets
- Automatic ticket numbering
- Priority levels: Low, Normal, High, Urgent
- Mock mode for development (switches to real Zendesk when configured)

### 🧪 Automated UI Testing
- Comprehensive Playwright test suite
- Automated screenshot capture for all major features
- Cross-browser testing support
- Visual regression testing capabilities

## Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Material-UI (MUI) for UI components
- MSAL React for authentication
- Axios for API communication
- Modern responsive design

**Backend:**
- Node.js with Express
- TypeScript
- MSAL Node for backend authentication
- Zendesk API client
- RESTful API architecture

**Testing:**
- Playwright for E2E testing
- Jest for unit testing
- Automated screenshot capture

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- (Optional) Microsoft Entra ID tenant for authentication
- (Optional) Zendesk account for ticket integration

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yukihonhk/testdemo02.git
cd testdemo02
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

4. **Install E2E Test Dependencies:**
```bash
cd ../e2e-tests
npm install
npx playwright install chromium
```

### Configuration

#### Backend Configuration

1. Copy the example environment file:
```bash
cd backend
cp .env.example .env
```

2. Edit `.env` with your credentials:
```env
# Server
PORT=5000

# Azure AD / Entra ID Configuration
AZURE_CLIENT_ID=your-client-id
AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret

# Zendesk Configuration
ZENDESK_SUBDOMAIN=your-subdomain
ZENDESK_EMAIL=your-email@example.com
ZENDESK_TOKEN=your-zendesk-api-token
```

**Note:** Leave Zendesk credentials empty to use mock mode for development.

#### Frontend Configuration

1. Copy the example environment file:
```bash
cd frontend
cp .env.example .env
```

2. Edit `.env` with your settings:
```env
# Azure AD / Entra ID Configuration
REACT_APP_AZURE_CLIENT_ID=your-client-id
REACT_APP_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id
REACT_APP_REDIRECT_URI=http://localhost:3000

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

#### Development Mode

1. **Start the Backend:**
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

2. **Start the Frontend (in a new terminal):**
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

#### Production Build

1. **Build the Backend:**
```bash
cd backend
npm run build
npm start
```

2. **Build the Frontend:**
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/build` directory.

### Running Tests

#### E2E Tests with Playwright

Run all tests:
```bash
cd e2e-tests
npm test
```

Run tests in headed mode (see the browser):
```bash
npm run test:headed
```

Run tests in UI mode (interactive):
```bash
npm run test:ui
```

View test report:
```bash
npm run report
```

Screenshots are automatically saved to `e2e-tests/screenshots/` during test runs.

#### Frontend Unit Tests

```bash
cd frontend
npm test
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/validate` - Validate token

### Q&A
- `POST /api/qa/ask` - Ask a question
- `GET /api/qa/history` - Get conversation history

### Knowledge Base
- `GET /api/knowledge` - Get all articles
- `GET /api/knowledge/search?q=query` - Search articles
- `GET /api/knowledge/:id` - Get article by ID

### Tickets
- `POST /api/tickets/create` - Create new ticket
- `GET /api/tickets` - Get all user tickets
- `GET /api/tickets/:id` - Get ticket by ID

## Project Structure

```
testdemo02/
├── backend/                 # Backend Node.js application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   └── index.ts        # Main entry point
│   ├── .env.example        # Example environment variables
│   └── package.json
│
├── frontend/               # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/        # Configuration files
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # Entry point
│   ├── .env.example       # Example environment variables
│   └── package.json
│
└── e2e-tests/             # End-to-end tests
    ├── tests/             # Test files
    ├── screenshots/       # Captured screenshots
    ├── playwright.config.ts
    └── package.json
```

## Mock Mode vs Production Mode

The application supports both mock and production modes:

### Mock Mode (Default)
- No external services required
- Suitable for development and testing
- Mock authentication (auto-login)
- Mock Zendesk tickets
- Pre-populated knowledge base

### Production Mode
- Requires Microsoft Entra ID configuration
- Requires Zendesk API credentials
- Real authentication flow
- Real ticket creation in Zendesk
- Can integrate with real knowledge base

## Security Considerations

⚠️ **Important Security Notes:**

1. Never commit `.env` files with real credentials
2. Use environment variables for all sensitive data
3. Implement proper JWT validation in production
4. Enable CORS only for trusted origins
5. Use HTTPS in production
6. Regularly update dependencies for security patches

## Deployment

### Backend Deployment
1. Build the backend: `npm run build`
2. Set environment variables on your hosting platform
3. Deploy the `dist` folder
4. Ensure Node.js runtime is available

### Frontend Deployment
1. Update API URL in `.env.production`
2. Build: `npm run build`
3. Deploy the `build` folder to static hosting (Netlify, Vercel, Azure Static Web Apps, etc.)

### Recommended Platforms
- **Backend**: Azure App Service, Heroku, AWS Elastic Beanstalk
- **Frontend**: Azure Static Web Apps, Netlify, Vercel, AWS S3 + CloudFront

## Testing Strategy

### Automated Tests Include:
- ✅ Homepage loading
- ✅ Tab navigation
- ✅ Q&A interaction
- ✅ Knowledge base search
- ✅ Ticket creation
- ✅ Ticket list display
- ✅ Screenshot capture for all features

## Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 5000 is available
- Verify `.env` file exists
- Run `npm install` again

**Frontend won't start:**
- Check if port 3000 is available
- Clear node_modules: `rm -rf node_modules && npm install`
- Check console for errors

**Tests failing:**
- Ensure both frontend and backend are running
- Check Playwright is installed: `npx playwright install`
- Increase timeout in playwright.config.ts

**Authentication issues:**
- Verify Entra ID configuration
- Check redirect URIs are registered
- Enable popup windows in browser

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

ISC

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

## Future Enhancements

- [ ] Real-time chat support
- [ ] File upload for tickets
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] AI-powered response suggestions
- [ ] Integration with more ticketing systems
- [ ] Multi-language support
- [ ] Dark mode theme

---

Built with ❤️ for IT Support Teams
 
