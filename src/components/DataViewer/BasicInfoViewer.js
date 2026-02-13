import React from 'react';
import labels from '../../labels';
import './BasicInfoViewer.css';

const BasicInfoViewer = ({ data }) => {
  return (
    <div className="basic-info-viewer-section">
      <table className="viewer-basic-info-table">
        <tbody>
          <tr>
            <td className="ms-name-cell">{data.ms_number} {data.ms_name}</td>
            <td className="data-id-cell">[ {data.data_id} ]</td>
          </tr>
          <tr>
            <td className="ms-name-optional-cell" colSpan="2">{data.ms_name_optional ? "(" + data.ms_name_optional + ")" : ''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BasicInfoViewer;