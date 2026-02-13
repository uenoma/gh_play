import React from 'react';
import './IconViewer.css';

const IconViewer = ({ msIcon }) => {
  return (
    <div className="icon-viewer-section">
      {msIcon ? (
        <img src={msIcon} alt="image" className="icon-image" />
      ) : (
        <div className="icon-placeholder"></div>
      )}
    </div>
  );
};

export default IconViewer;