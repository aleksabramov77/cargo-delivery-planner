import { useEffect, useState } from 'react';

export const useViewportSize = () => {
  const [sizes, setSizes] = useState({ innerWidth: 0, innerHeight: 0 });

  useEffect(() => {
    const setter = () => setSizes({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });

    setter();

    window.addEventListener('resize', setter);

    return () => {
      window.removeEventListener('resize', setter);
    };
  }, []);

  return sizes;
};
