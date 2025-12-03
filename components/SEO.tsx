import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({ title, description, image, keywords }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | DevFolio`;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('description', description);
    if (keywords && keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }

    // Open Graph
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', 'website', true);
    if (image) {
      updateMeta('og:image', image, true);
    }

    // Twitter
    updateMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (image) {
      updateMeta('twitter:image', image);
    }

  }, [title, description, image, keywords]);

  return null;
};

export default SEO;