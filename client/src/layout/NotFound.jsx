import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Sorry, that page cannot be found – it's a big 404. But Hatchways is
        still pretty cool, right?
      </h1>
      <p>
        Click <Link to="/">here</Link> to return to the home page.{' '}
      </p>
    </div>
  );
};

export default NotFound;
