import React from 'react'
import './Logo.css'

const Logo = () => {
  return (
    <div class="navbar-logo">
      <span class="aura">Aura</span>
      <span class="kaze">kaze</span>
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDFxajVpM3Nvd3ptazFmMTR5MzhoN3g0cWNkczU2d3NseDYzZWFhNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/55PkuDHvG7u36/giphy.webp"
        alt="Butterfly Animation"
        class="butterfly"
      />
    </div>
  );
}

export default Logo