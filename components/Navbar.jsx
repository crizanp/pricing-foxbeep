import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './home/footer';

const Layout = ({
  children,
  title = 'Build with Purpose | Custom Software Development Company',
  description = 'Your trusted partner in creating powerful, scalable software solutions across industries like Finance, Healthcare, Education, and Real Estate. We specialize in Web, Mobile, AI, Blockchain, and more.',
  keywords = 'software development, custom software, web development, mobile apps, AI solutions, blockchain, cloud development, UI/UX design, IT services',
  ogImage = '/images/logo.jpg',
  canonical = '',
  structuredData = null,
}) => {
  const canonicalUrl = canonical || process.env.NEXT_PUBLIC_SITE_URL;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Build with Purpose",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/branding/logo.png`,
    "description": description,
    "sameAs": [
      "https://www.linkedin.com/company/your-company",
      "https://twitter.com/your-company",
      "https://github.com/your-company"
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+1-800-123-4567",
      "contactType": "Customer Service",
      "areaServed": "Worldwide",
      "availableLanguage": "English"
    }]
  };

  // Apply dark theme to the document body when component mounts
  useEffect(() => {
    document.documentElement.classList.add('dark-theme');
    document.body.classList.add('bg-black');
    document.body.classList.add('text-gray-200');

    // Cleanup function to remove classes if needed
    return () => {
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.remove('bg-black');
      document.body.classList.remove('text-gray-200');
    };
  }, []);

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
        <link rel="manifest" href="/images/favicon.png" />
        <link rel="mask-icon" href="/images/favicon.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#121212" />
        <meta name="theme-color" content="#000000" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || defaultStructuredData),
          }}
        />

        {/* Dark Theme Custom CSS */}
        <style jsx global>{`
          :root {
            --primary-color: #0d6efd;
            --secondary-color: #6c757d;
            --background-color: #000000;
            --surface-color: #121212;
            --text-primary: #f8f9fa;
            --text-secondary: #adb5bd;
            --border-color: #2d2d30;
          }
          
          .dark-theme {
            color-scheme: dark;
          }
          
          body {
            background-color: var(--background-color);
            color: var(--text-primary);
          }
          
          a {
            color: var(--primary-color);
          }
          
          a:hover {
            color: #0b5ed7;
          }
          
          .card, .bg-light {
            background-color: var(--surface-color) !important;
            border-color: var(--border-color) !important;
          }
          
          .border {
            border-color: var(--border-color) !important;
          }
          
          .text-dark {
            color: var(--text-primary) !important;
          }
          
          .text-secondary {
            color: var(--text-secondary) !important;
          }
        `}</style>
      </Head>

      <div className="bg-black min-h-screen flex flex-col">
        <Navbar className="bg-black border-b border-gray-800" />
        <main className="pt-16 flex-grow bg-black text-gray-200">{children}</main>
        <Footer className="bg-black border-t border-gray-800" />
      </div>
    </>
  );
};

export default Layout;