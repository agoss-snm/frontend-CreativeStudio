import React, { useEffect } from 'react';

const Chatbox = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://app.bluecaribu.com/conversion/integration/6a3d649864a929c5df55110dc9d0daef';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbox;
