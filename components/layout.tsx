import React, { memo } from 'react';

const classes = {
  wrapper: 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-300',
  container: 'max-w-4xl mx-auto px-6 py-12 sm:px-8 lg:px-12',
  backgroundPattern: 'fixed inset-0 -z-10 overflow-hidden',
  patternSvg: 'absolute -top-40 -right-32 w-80 h-80 text-primary-100 dark:text-gray-800 opacity-20',
  patternSvg2: 'absolute -bottom-40 -left-32 w-80 h-80 text-primary-100 dark:text-gray-800 opacity-20',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = memo(({ children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundPattern}>
        <svg className={classes.patternSvg} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <svg className={classes.patternSvg2} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
