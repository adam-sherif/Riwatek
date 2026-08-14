import { useEffect } from 'react';

const SITE_NAME = 'ريواتك';

const setMeta = (name, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setOgMeta = (property, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * Sets a unique <title> and <meta name="description"> per page (#11, #12).
 * This is a client-rendered SPA with no server-side rendering, so these
 * only update after JS runs — fine for browser tabs/bookmarks and for
 * search engines that execute JS (Google does), but if this ever needs to
 * be crawler-perfect on first byte, it needs real SSR/prerendering, which
 * is a bigger architectural change than this hook.
 */
export const usePageMeta = ({ title, description, image }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — حلول الري والمياه بالجملة`;
    document.title = fullTitle;
    setMeta('description', description);
    setOgMeta('og:title', fullTitle);
    setOgMeta('og:description', description);
    if (image) setOgMeta('og:image', image);
  }, [title, description, image]);
};
