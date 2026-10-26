import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        window.addEventListener('load', () => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          console.log('Performance Metrics:', {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            totalTime: perfData.loadEventEnd - perfData.fetchStart,
          });
        });
      }
    }
  }, []);

  return (
    <div className={`${sans.variable} ${mono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
