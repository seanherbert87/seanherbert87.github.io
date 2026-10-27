import React, { memo } from 'react';

const classes = {
  wrapper: 'relative min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  backgroundGrid: 'bg-grid pointer-events-none absolute inset-x-0 top-0 h-[48rem]',
  container: 'relative max-w-4xl xl:max-w-6xl 2xl:max-w-7xl min-[2000px]:max-w-[90rem] mx-auto px-6 py-12 sm:px-8 lg:px-12',
  footer: 'mt-24 pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-between font-mono text-xs text-gray-600 dark:text-gray-400',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = memo(({ children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundGrid} aria-hidden="true" />
      <main className={classes.container}>
        {children}
        <footer className={classes.footer}>
          <span>© {new Date().getFullYear()} Sean Herbert</span>
          <span>seanherbert.me</span>
        </footer>
      </main>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
