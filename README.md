# 💰 Expense Tracker

A modern, full-stack expense tracking application that helps you manage your finances with ease. Built with the latest React 19, powered by Supabase for real-time data management, and featuring beautiful Chart.js visualizations to analyze your spending patterns.

## ✨ Features

- **💸 Expense Management** - Add, edit, and delete expenses with ease
- **📊 Data Visualization** - Interactive charts and graphs powered by Chart.js
- **🏷️ Category Organization** - Organize expenses by customizable categories
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **☁️ Cloud Sync** - Real-time data synchronization with Supabase
- **🔐 User Authentication** - Secure user accounts and data privacy
- **📈 Spending Analytics** - Track spending trends and patterns over time
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **💾 Data Persistence** - Reliable cloud storage with Supabase
- **📅 Date Filtering** - Filter expenses by date ranges

## 🚀 Tech Stack

### Frontend
- **React 19.1.0** - Latest React with improved performance and features
- **Vite 7.0.0** - Next-generation frontend tooling for lightning-fast development
- **Chart.js 4.5.0** - Beautiful, responsive charts for data visualization

### Backend & Database
- **Supabase 2.50.2** - Open-source Firebase alternative with PostgreSQL
- **Real-time Database** - Live updates across all connected clients
- **Authentication** - Built-in user management and security

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Support** - Type safety and better developer experience
- **Hot Module Replacement (HMR)** - Instant updates during development

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18.x or higher)
- **npm** or **yarn** package manager
- **Supabase Account** - [Sign up for free](https://supabase.com)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rishik0821/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Supabase Configuration

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Get your project credentials** from Settings > API

3. **Create environment file**
   ```bash
   # Create .env file in root directory
   touch .env
   ```

4. **Add your Supabase credentials**
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 4. Database Setup

Set up your Supabase database tables and configure Row Level Security (RLS) policies as needed for your expense tracking functionality. Refer to your project's database schema for the specific table structure and security policies.

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📜 Available Scripts

- **`npm run dev`** - Start development server with HMR
- **`npm run build`** - Build production-ready application
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

## 📁 Project Structure

```
Expense-Tracker/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   │   ├── charts/        # Chart.js components
│   │   ├── forms/         # Form components
│   │   └── ui/            # UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Supabase API calls
│   ├── utils/            # Utility functions
│   ├── styles/           # CSS and styling
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── README.md             # Project documentation
```

## 🎨 Key Features Breakdown

### 📊 Data Visualization
- **Pie Charts** - Expense breakdown by category
- **Line Charts** - Spending trends over time
- **Bar Charts** - Monthly/weekly comparisons
- **Interactive Elements** - Hover effects and tooltips

### 💾 Data Management
- **Real-time Updates** - Changes sync instantly across devices
- **Offline Support** - Works offline with data sync when reconnected
- **Data Export** - Export expense data in various formats
- **Backup & Restore** - Automatic cloud backups

### 🔐 Security Features
- **User Authentication** - Secure login/signup with Supabase Auth
- **Row Level Security** - Database-level security policies
- **Data Privacy** - Each user's data is completely isolated
- **Session Management** - Automatic token refresh and logout

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Drag and drop 'dist' folder to Netlify
# Or connect your GitHub repository
```

### Environment Variables for Production
Remember to set these in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Preview production build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for type safety
- Write meaningful commit messages
- Ensure responsive design
- Test with different screen sizes
- Follow ESLint rules

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Supabase Connection Issues:**
- Verify your `.env` file has correct credentials
- Check Supabase project status and API keys
- Ensure RLS policies are correctly configured

**Chart.js Issues:**
- Make sure Chart.js version is compatible
- Check for proper canvas element rendering

## 🔮 Roadmap

Planned features and improvements:
- [ ] Budget setting and alerts
- [ ] Recurring expense management
- [ ] Receipt photo uploads
- [ ] Expense sharing with family/friends
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native)
- [ ] API integrations (bank accounts)
- [ ] Multi-currency support
- [ ] Dark mode theme
- [ ] Expense templates

## 📈 Performance Optimizations

- **Vite HMR** - Lightning-fast development updates
- **Code Splitting** - Lazy loading for optimal bundle size
- **Chart.js Optimization** - Efficient data rendering
- **Supabase Optimization** - Optimized queries and real-time subscriptions
- **Image Optimization** - Compressed assets for faster loading

## 📞 Support & Help

Need assistance? Here are your options:

- **🐙 GitHub Issues**: [Report bugs or request features](https://github.com/rishik0821/Expense-Tracker/issues)
- **📧 Email**: [sairishik589@gmail.com]
- **💬 Discussions**: [GitHub Discussions](https://github.com/rishik0821/Expense-Tracker/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the incredible React 19 framework
- **Supabase Team** - For the amazing backend-as-a-service platform
- **Chart.js Contributors** - For the powerful charting library
- **Vite Team** - For the blazing-fast build tool
- **Open Source Community** - For inspiration and continuous learning

## 🌟 Show Your Support

If this project helped you, please consider:
- ⭐ **Star this repository**
- 🐛 **Report issues** to help improve the project
- 🚀 **Share it** with others who might find it useful
- 🤝 **Contribute** to make it even better

---

**🔗 Connect with me:**
- GitHub: [@rishik0821](https://github.com/rishik0821)


---

*Built with ❤️ and modern web technologies by [rishik0821](https://github.com/rishik0821)*
