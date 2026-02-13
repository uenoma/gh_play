import React from 'react';
import labels from '../../labels';
import './WeaponSpecsViewer.css';

const WeaponSpecsViewer = ({ items }) => {
  return (
    <div className="weapon-specs-viewer-section">
      <table className="weapon-specs-viewer-table">
      <thead>
        <tr>
          <th>{labels.weaponName}</th>
          <th>{labels.armor}</th>
          <th>{labels.dcp}</th>
          <th>{labels.hp}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.name || '-'}</td>
            <td>{item.armor || '-'}</td>
            <td>{item.dcp || '-'}</td>
            <td>{item.hp || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default WeaponSpecsViewer;