import React from 'react';
import BodySpecPartViewer from './BodySpecPartViewer';

const BodySpecsViewer = ({ bodySpecs }) => {
  return (
    <div className="viewer-section">
      <div className="viewer-row">
        {bodySpecs && ['head', 'leg', 'body', 'arm', 'backpack', 'base'].map(part => (
          bodySpecs[part] && bodySpecs[part].length > 0 ? (
            <BodySpecPartViewer key={part} part={part} items={bodySpecs[part]} />
          ) : null
        ))}
      </div>
    </div>
  );
};

export default BodySpecsViewer;