import React from 'react';
import labels from '../../labels';
import './BodyPartViewer.css';

const BodyPartViewer = ({ bodyPart }) => {
  const directionLabels = {
    front: labels.front,
    right: labels.right,
    left: labels.left,
    back: labels.back
  };

  const positionLabels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className="body-part-viewer-section">
      <table className="body-part-viewer-table body-part-table">
        <thead>
          <tr>
            <th>{labels.bodyPart}</th>
            {positionLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyPart && ['front', 'right', 'left', 'back'].map(direction => (
            <tr key={direction}>
              <th>{directionLabels[direction]}</th>
              {bodyPart[direction] && bodyPart[direction].map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BodyPartViewer;