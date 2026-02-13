import React from 'react';
import labels from '../../labels';
import './GrappleTypesViewer.css';

const GrappleTypesViewer = ({ items }) => {
  return (
    <div className="grapple-viewer-section">
      <table className="grapple-viewer-table viewer-grapple-types-table">
        <thead>
          <tr>
            <th>{labels.grappleMethod}</th>
            <th>{labels.hitRate}</th>
            <th>{labels.power}</th>
            <th>{labels.destructivePower}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.power}</td>
              <td>{item.destructive_power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrappleTypesViewer;