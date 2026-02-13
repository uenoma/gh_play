import React from 'react';
import labels from '../../labels';
import './ThrustersViewer.css';

const ThrustersViewer = ({ items }) => {
  return (
    <div className="thrusters-viewer-section">
      <table className="thrusters-viewer-table viewer-thrusters-table">
        <thead>
          <tr>
            <th>{labels.thrusterType}</th>
            <th>{labels.thrust}</th>
            <th>{labels.direction}</th>
            <th>{labels.fuel}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.direction}</td>
              <td>{item.fuel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThrustersViewer;