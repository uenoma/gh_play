import React, { useState } from 'react';
import './PlotContainer.css';
import PlotSheet from './PlotSheet';

function PlotContainer() {
  const [pilotData, setPilotData] = useState({
    msType: 'ガンダム',
    pilot: 'アムロ・レイ',
    points: 18
  });

  return (
    <div className="PlotContainer">
      <PlotSheet pilotData={pilotData} />
    </div>
  );
}

export default PlotContainer;