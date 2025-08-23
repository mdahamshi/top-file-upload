import { createContext, useMemo, useContext, useEffect, useState } from 'react';

export const AppContext = createContext({
  appName: 'My App',
  toggleTheme: () => {},
  theme: 'light',
});
const appConsts = {
  appName: "SaraFiles",
  gitRepo: 'https://github.com/mdahamshi/top-file-upload',
}
export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const gitRepo = 'https://github.com/mdahamshi/top-file-upload';
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
    document.title = appConsts.appName;
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(
    () => ({
      toggleTheme,
      theme,
      appConsts,
    }),
    [theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
