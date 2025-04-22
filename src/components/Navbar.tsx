import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  return <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-white">K's Circuit </span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Lab</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/kcl" current={location.pathname === "/kcl"}>KCL</NavLink>
            <NavLink to="/kvl" current={location.pathname === "/kvl"}>KVL</NavLink>
            <NavLink to="/practice" current={location.pathname === "/practice"}>Practice</NavLink>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>;
}
function NavLink({
  to,
  current,
  children
}: {
  to: string;
  current: boolean;
  children: React.ReactNode;
}) {
  return <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${current ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}>
      {children}
    </Link>;
}