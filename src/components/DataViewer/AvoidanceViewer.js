import React from 'react';
import labels from '../../labels';
import './AvoidanceViewer.css';

const AvoidanceViewer = ({ avoidance }) => {
  const directionLabels = {
    front: labels.front,
    side: labels.side,
    back: labels.back,
  };

  const valueLabels = ["〜2", "〜4", "〜6", "〜7", "〜12", "13〜"];

  return (
    <div className="viewer-section">
      <table className="viewer-table">
        <thead>
          <tr>
            <th>{labels.avoidance}</th>
            {valueLabels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {avoidance &&
            ["front", "side", "back"].map((direction) => (
              <tr key={direction}>
                <th>{directionLabels[direction]}</th>
                {avoidance[direction] &&
                  avoidance[direction].values &&
                  avoidance[direction].values.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvoidanceViewer;