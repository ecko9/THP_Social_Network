import React from 'react';
import NavBar from 'components/NavBar';

const NotFound = () => {
  return (
    <div className="not-found">
      <NavBar />
      <h2>Erreur 404: Page not Found...</h2>
    </div>
  );
};

export default NotFound;