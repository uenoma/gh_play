import React from 'react';
import labels from '../../labels';
import './BodySpecPartViewer.css';

const BodySpecPartViewer = ({ part, items }) => {
  return (
    <div className="body-spec-part">
      <table className="body-spec-part-table">
        <thead>
          <tr>
            <th>{labels[part]}</th>
            {items && items.map((item, index) => (
              <th key={`part-${index}`}>{item.name || `Item ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{labels.front}</td>
            {items && items.map((item, index) => (
              <td key={index}>{item.values && item.values[0] !== null ? item.values[0] : '-'}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.right}</td>
            {items && items.map((item, index) => (
              <td key={index}>{item.values && item.values[1] !== null ? item.values[1] : '-'}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.left}</td>
            {items && items.map((item, index) => (
              <td key={index}>{item.values && item.values[2] !== null ? item.values[2] : '-'}</td>
            ))}
          </tr>
          <tr className="back-row">
            <td>{labels.back}</td>
            {items && items.map((item, index) => (
              <td key={index}>{item.values && item.values[3] !== null ? item.values[3] : '-'}</td>
            ))}
          </tr>
          <tr className="armor-row">
            <td>{labels.armor}</td>
            {items && items.map((item, index) => (
              <td key={index}>{item.armor !== null ? item.armor : '-'}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.dcp}</td>
            {items && items.map((item, index) => (
              <td key={index}>
                <div className={item.part_explosion ? 'dcp-circle' : ''}>{item.dcp !== null ? item.dcp : '-'}</div>
              </td>
            ))}
          </tr>
          <tr>
            <td>{labels.hp}</td>
            {items && items.map((item, index) => (
              <td key={index}>{(part === 'head' || part === 'body' || part === 'base') && item.body ? `(${item.hp})` : item.hp !== null ? item.hp : '-'}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BodySpecPartViewer;