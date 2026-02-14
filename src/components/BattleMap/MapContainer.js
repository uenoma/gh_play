import './MapContainer.css';
import HexMap from './HexMap';
import { useState, useEffect } from "react"

function MapContainer() {

  const [mapWidth, setMapWidth] = useState(24);
  const [mapHeight, setMapHeight] = useState(32);
  const [hexSize, setHexSize] = useState(60);

  const changeSize = (e) => {
    var width = Number(document.getElementById("inputWidth").value);
    var height = Number(document.getElementById("inputHeight").value);
    var hexSize = Number(document.getElementById("inputHexSize").value);

    width = width === 0 ? 24 : width;
    height = height === 0 ? 32 : height;
    hexSize = hexSize === 0 ? 60 : hexSize;

    width = Math.max(width, 1);
    width = Math.min(width, 99);
    height = Math.max(height, 1);
    height = Math.min(height, 99);
    hexSize = Math.max(hexSize, 30);
    hexSize = Math.min(hexSize, 200);

    setMapWidth(width);
    setMapHeight(height);
    setHexSize(hexSize);
  }

  return (
    <div className="MapContainer">
      <div className="MapContainerSettings">
        <div>
          <label>Width(1～99)</label>
          <input type="number" min="1" max="99" step="1" placeholder='24' id="inputWidth" onChange={(e) => changeSize(e)}></input>
        </div>
        <div>
          <label>Height(1～99)</label>
          <input type="number" min="1" max="99" step="1" placeholder='32' id="inputHeight" onChange={(e) => changeSize(e)}></input>
        </div>
        <div>
          <label>HexSize(30～200)</label>
          <input type="number" min="30" max="200" step="1" placeholder='60' id="inputHexSize" onChange={(e) => changeSize(e)}></input>
        </div>
      </div>
      <HexMap width={mapWidth} height={mapHeight} hexSize={hexSize}></HexMap>
    </div>
  );}

export default MapContainer;