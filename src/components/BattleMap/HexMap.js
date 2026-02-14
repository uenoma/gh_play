import unitImage1 from '../../assets/images/AMX-004.png';
import unitImage2 from '../../assets/images/MSZ-010S.png';
import './HexMap.css';
import { useState, useEffect } from "react"

function HexMap(props) {

  // const [context, setContext] = useState(null);

  const TO_RADIANS = Math.PI/180;
  const hexHeight = props.hexSize ? props.hexSize : 0;
  const lineLength = hexHeight / Math.sqrt(3);
  const hexWidth = lineLength * 1.5;

  const canvasWidth = (Number(props.width) + 1 ) * hexWidth;
  const canvasHeight = (Number(props.height) + 1) * hexHeight;
  
  const textOffset = lineLength / 2 - 12;

  const hexPos = (x, y) => {
    var yPos = y * hexHeight - (hexHeight / 2 + 15);
    var xPos = x * (hexHeight - lineLength / 4) - hexHeight / 2 + 20;

    const offsetY = hexHeight / 2;
    if (x % 2 !== 0) {
      yPos += offsetY;
    }
    
    const length = hexHeight * 0.7;
    const unitOffsetX = (hexHeight - length) / 6;
    const unitOffsetY = (hexHeight - length) / 2;

    return {
      x: xPos - unitOffsetX,
      y: yPos + unitOffsetY,
      width: length,
      height: length,
    }
  }

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    for (var y = 1; y <= props.height; y++) {
      for (var x = 1; x <= props.width; x++) {

        var yPos = y * hexHeight - (hexHeight / 2 + 15);
        var xPos = x * (hexHeight - lineLength / 4) - hexHeight / 2 + 20;

        const offsetY = hexHeight / 2;
        if (x % 2 !== 0) {
          yPos += offsetY;
        }

        const strHead = String(x).padStart(2, '0');
        const strTail = String(y).padStart(2, '0');

        canvasContext.fillStyle  = "skyblue";
        canvasContext.fillText(strHead + strTail, xPos + textOffset, yPos + hexHeight - 2);

        canvasContext.strokeStyle = "gray";
        canvasContext.lineWidth = 1;

        // 上側
        canvasContext.moveTo(xPos, yPos);
        canvasContext.lineTo(xPos + lineLength, yPos);

        // 左側
        canvasContext.moveTo(xPos, yPos);
        canvasContext.lineTo(xPos - lineLength / 2, yPos + hexHeight / 2);
        canvasContext.lineTo(xPos, yPos + hexHeight);

        // 右側
        canvasContext.moveTo(xPos + lineLength, yPos);
        canvasContext.lineTo(xPos + lineLength + lineLength / 2, yPos + hexHeight / 2);
        canvasContext.lineTo(xPos + lineLength, yPos + hexHeight);

        // 下側
        canvasContext.moveTo(xPos, yPos + hexHeight);
        canvasContext.lineTo(xPos + lineLength, yPos + hexHeight);

        // 中心点
        canvasContext.roundRect(xPos + lineLength / 2, yPos + hexHeight / 2, 1, 1);

      }
    }
    canvasContext.stroke();


    {
      const unitPos = hexPos(2, 6);
      const angle = 60;

      const image = new Image();
      image.src = unitImage1;
      image.onload = () => {
        canvasContext.save();
        canvasContext.translate(unitPos.x + unitPos.width / 2, unitPos.y + unitPos.height / 2);
        canvasContext.rotate(angle * TO_RADIANS);
        canvasContext.drawImage(image, -unitPos.width / 2, -unitPos.height / 2, unitPos.width, unitPos.height);
        canvasContext.restore();
      }
    }
    {
      const unitPos = hexPos(7, 2);
      const angle = 180;

      const image = new Image();
      image.src = unitImage2;
      image.onload = () => {
        canvasContext.save();
        canvasContext.translate(unitPos.x + unitPos.width / 2, unitPos.y + unitPos.height / 2);
        canvasContext.rotate(angle * TO_RADIANS);
        canvasContext.drawImage(image, -unitPos.width / 2, -unitPos.height / 2, unitPos.width, unitPos.height);
        canvasContext.restore();
      }
  
    }


    // setContext(canvasContext);
  }, [props])

  // useEffect(() => {

  // }, [context])


  return (
    <div className="HexMap">
      <canvas width={canvasWidth} height={canvasHeight} id="canvas"></canvas>
    </div>
  );
}

export default HexMap;
