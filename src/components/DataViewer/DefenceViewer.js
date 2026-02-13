import React from 'react';
import labels from '../../labels';
import './DefenceViewer.css';

const DefenceViewer = ({ defence }) => {
  return (
    <div className="defence-viewer-section">
      <table className="defence-viewer-table defence-table">
        <thead>
          <tr>
            <th>{labels.defence}</th>
            <th>{labels.front}</th>
            <th>{labels.right}</th>
            <th>{labels.left}</th>
            <th>{labels.back}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{labels.sameSame}</td>
            {defence.same_same.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.sameDifferent}</td>
            {defence.same_different.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.differentSame}</td>
            {defence.different_same.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
          </tr>
          <tr>
            <td>{labels.differentDifferent}</td>
            {defence.different_different.map((val, i) => (
              <td key={i}>{val}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DefenceViewer;