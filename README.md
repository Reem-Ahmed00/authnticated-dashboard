🚀 React + Vite Project
This project is a minimal setup using React with Vite for fast development and hot module replacement (HMR). It also includes ESLint for code quality and follows a modular architecture using Redux Toolkit and React Router.

📦 Tech Stack
React 18

Vite (lightning-fast build tool)

TypeScript (recommended)

Redux Toolkit (state management)

React Router DOM (routing)

json-server (mock backend API)

Bootstrap (UI framework)

⚙️ Getting Started
1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies
npm install

3. Start the development server
Open two terminals:

Terminal 1: Start Vite (React frontend)
npm run dev

Terminal 2: Start JSON Server (Mock backend)
json-server --watch db.json --port 5000

🧪 Running Tests
This project uses Jest and React Testing Library.

npm run test

📁 Recommended Project Structure
css
Copy
Edit
src/
├── components/
├── pages/
├── redux/
│   ├── slices/
│   └── store.ts
├── App.tsx
├── main.tsx

✅ Tips
Keep your API endpoints in a separate file (api.ts) for easy maintenance.

Make sure the mock API (json-server) is running before using features that rely on API calls (e.g., fetching posts, login).

You can edit db.json to customize your mock data.