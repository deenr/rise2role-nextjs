# Rise2Role

### A simple way to organize your job applications

![Version](https://img.shields.io/github/package-json/v/deenr/rise2role)
![Build Status](https://img.shields.io/github/actions/workflow/status/deenr/rise2role/ci.yml?branch=main)

---

## 🚀 About Rise2Role

In today's competitive job market, staying organized is key to landing your dream role. **Rise2Role** transforms your job search from a scattered process into a streamlined journey. With our intuitive Kanban board interface, you can visualize your entire job search pipeline at a glance.

**Why Rise2Role?**

- 📊 **Visual Progress:** Track your applications across different stages with our intuitive drag-and-drop Kanban board (coming soon), designed for seamless user interaction.
- 🔄 **Seamless Sync:** Your data is securely stored on Supabase, ensuring real-time updates and synchronization across devices.
- 📱 **Responsive Design:** Built with Next.js, Rise2Role offers a fully responsive experience, allowing you to manage your job search from any device, whether it's a desktop, tablet, or mobile.
- ⚡ **Fast Performance:** Leveraging Next.js's server-side rendering and static site generation, Rise2Role delivers fast load times and optimal performance, enhancing your user experience.
- 🎯 **Focus-Driven:** Enjoy a clean, distraction-free interface that keeps you focused on what matters most—landing your dream job.

Whether you're a recent graduate exploring opportunities or a seasoned professional making a career move, Rise2Role adapts to your needs, transforming job tracking into a streamlined and efficient process.

## 🖥️ Demo

You can view a fully working demo at [r2r.deanreymen.be](https://r2r.deanreymen.be/).

## 🛠️ Built With

- [React](https://reactjs.org) – Framework for creating interactive UIs
- [Next.js](https://nextjs.org) – React framework for server-side rendering
- [Tailwind CSS](https://tailwindcss.com) – Utility-first CSS framework for custom styling
- [Shadcn](https://ui.shadcn.dev) – Radix Primitives with Tailwind CSS
- [Lucide Icons](https://lucide.dev) – Simple, customizable icon library
- [Supabase](https://supabase.com) – Open-source Firebase alternative for backend services

## 🚦 Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. [Download Node.js](https://nodejs.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/deenr/rise2role-nextjs.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd rise2role-nextjs
   ```
3. **Create a `.env` file in the root directory with the following content:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   DATABASE_URL="your-database-url"
   DIRECT_URL="your-direct-url"
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Run the app:**
   ```bash
   npm run dev
   ```

The app will run on `http://localhost:3000`. Now you're ready to start managing your job applications!

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

### Project Structure

```
rise2role/
├── prisma/                     # Contains Prisma-related files
│   ├── migrations/             # Prisma migrations for database schema changes
│   ├── schema.prisma           # Prisma schema definition
├── src/                        # Main source code directory
│   ├── app/                    # Application routing and pages
│   │   ├── dashboard/          # Dashboard-related components and pages
│   │   ├── board/              # Kanban board components and pages
│   │   ├── (auth-pages)/       # Authentication-related pages (sign up, sign in, etc.)
│   │   └── (landing)/          # Landing page components and pages
│   ├── data-access/            # Data access layer for interacting with the database
│   ├── hooks/                  # Custom React hooks for reusable logic
│   ├── lib/                    # Utility functions and libraries
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # General utility functions
├── public/                     # Static assets (images, fonts, etc.)
├── tests/                      # Test files for unit and integration tests
├── .env                        # Environment variables for local development
├── .gitignore                  # Specifies files and directories to ignore in Git
├── README.md                   # Project documentation
└── package.json                # Project metadata and dependencies
```

## 🤝 Contributing

Contributions make the open source community thrive! Here's how you can help:

1. **Fork the repository**
2. **Create your Feature Branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your Changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the Branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Every contribution, no matter how small, helps make Rise2Role better for everyone!

## 📫 Contact

- **X:** [@deanreymen](https://x.com/deanreymen)
- **LinkedIn:** [/in/dean-reymen](https://linkedin.com/in/dean-reymen)

## 🙏 Acknowledgments

Built with appreciation for:

- [React](https://reactjs.org) - The library that makes it all possible
- [Next.js](https://nextjs.org) - For server-side rendering capabilities
- [Tailwind CSS](https://tailwindcss.com) - For making styling a breeze
- [Lucide Icons](https://lucide.dev) - For the beautiful icons
- All our contributors and supporters

---
