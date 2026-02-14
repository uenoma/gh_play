import React, { useState } from 'react';
import './PlotContainer.css';
import PlotSheet from './PlotSheet';

function PlotContainer() {
  const [pilotData, setPilotData] = useState({
    msType: 'ガンダム',
    pilot: 'アムロ・レイ',
    points: 150
  });

  return (
    <div className="PlotContainer">
      <h2>行動計画</h2>
      <PlotSheet pilotData={pilotData} />
    </div>
  );
}

export default PlotContainer;