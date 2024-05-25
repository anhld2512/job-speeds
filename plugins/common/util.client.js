/**
 *  2023-01-17.
 * Get device media breakpoints.
 * @returns {String} Breakpoints
 */
export const media = () => {
  const innerWidth = window.innerWidth;
  if (innerWidth >= 1400)
    return 'xxl';
  else if (innerWidth >= 1200)
    return 'xl';
  else if (innerWidth >= 992)
    return 'lg';
  else if (innerWidth >= 768)
    return 'md';
  else if (innerWidth >= 576)
    return 'sm';
  else
    return 'xs';
}

/**
 *  2023-07-13.
 * Detect if browser is on a mobile device
 */
export const detectMobile = () => {
  return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);
}

export default { media, detectMobile }