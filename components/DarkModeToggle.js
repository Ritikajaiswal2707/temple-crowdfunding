import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <span className="absolute left-1 top-1 w-4 h-4 flex items-center justify-center text-xs">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
