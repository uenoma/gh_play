import React from 'react';
import labels from '../../labels';
import './ReceiveTypesViewer.css';

const ReceiveTypesViewer = ({ items }) => {
  return (
    <div className="receive-types-viewer-section">
      <table className="receive-types-viewer-table">
        <thead>
          <tr>
            <th>{labels.receiveMethod}</th>
            <th>{labels.receiveRate}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.nama}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiveTypesViewer;