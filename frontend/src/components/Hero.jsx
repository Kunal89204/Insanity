import React, { useState } from 'react';

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && <div className="preloader">Loading</div>}
      <img
        src="https://zubio-preyantechnosys.myshopify.com/cdn/shop/files/zubio-banner.jpg?v=1696229761"
        alt="Hero"
        onLoad={handleImageLoad}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default Hero;
