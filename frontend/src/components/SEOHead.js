import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Rivibibu Prabashwara - Mathematics Student Portfolio",
  description = "Exploring the cosmos through science, mathematics, and imagination. Advanced level science student specializing in mathematics, physics, programming, and cryptography.",
  keywords = "mathematics, physics, programming, cryptography, student portfolio, science, Rivibibu Prabashwara, advanced level, Sri Lanka",
  ogImage = "/og-image.jpg",
  url = "https://rivibibu-portfolio.com",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        "name": "Rivibibu Prabashwara",
        "givenName": "Rivibibu",
        "familyName": "Prabashwara",
        "jobTitle": "Mathematics Student",
        "description": "Advanced level science student specializing in mathematics, physics, programming, and cryptography",
        "url": url,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Colombo",
          "addressCountry": "LK"
        },
        "knowsAbout": [
          "Mathematics",
          "Physics",
          "Chemistry", 
          "Programming",
          "Cryptography",
          "Computer Science",
          "Advanced Level Sciences"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Advanced Level Science Stream"
        },
        "sameAs": [
          "https://github.com/rivibibu",
          "https://linkedin.com/in/rivibibu",
          "https://twitter.com/rivibibu"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "Rivibibu Prabashwara Portfolio",
        "description": description,
        "publisher": {
          "@id": `${url}/#person`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${url}/?s={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        "url": url,
        "name": title,
        "isPartOf": {
          "@id": `${url}/#website`
        },
        "about": {
          "@id": `${url}/#person`
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "description": description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": url
            }
          ]
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Rivibibu Prabashwara" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rivibibu Prabashwara Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@rivibibu" />
      <meta name="twitter:site" content="@rivibibu" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#9333ea" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      <meta name="application-name" content="Rivibibu Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Rivibibu Portfolio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEOHead;