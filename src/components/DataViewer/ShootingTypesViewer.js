import React from "react";
import labels from "../../labels";
import "./ShootingTypesViewer.css";

const ShootingTypesViewer = ({ items }) => {
  return (
    <div className="viewer-section">
      <table className="viewer-table shooting-types-table">
        <thead>
          <tr>
            {/* <th colSpan="2" className="shooting-name-column">
              武装＼距離
            </th> */}
            <th></th>
            <th className="shooting-name-column">武装 ＼ 距離</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7・8</th>
            <th>9・10</th>
            <th>11・12</th>
            <th>13〜15</th>
            <th>{labels.times}</th>
            <th>{labels.totalCount}</th>
            <th className="shooting-direction-column">{labels.shootingDirection}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={`hit-${index}`}
              className={index === items.length - 1 ? "hit-last-row" : ""}
            >
              {index === 0 ? (
                <>
                  <td rowSpan={items.length}>命中</td>
                  <td rowSpan="1">{item.name}</td>
                </>
              ) : (
                <td rowSpan="1">{item.name}</td>
              )}
              {Array.from({ length: 10 }, (_, i) => (
                <td key={`hit-${index}-${i}`}>
                  {item.hit_rates &&
                    (item.hit_rates[i] === 0 ? 0 : (item.hit_rates[i] !== null ? item.hit_rates[i] : ""))}
                </td>
              ))}
              <td>
                <div className={item.concentration ? "times-circle" : ""}>
                  {item.times || ""}
                </div>
              </td>
              <td>
                {item.total_count || "NO"}
                {item.total_count_times > 1 ? `×${item.total_count_times}` : ""}
              </td>
              <td>{item.shooting_direction || ""}</td>
            </tr>
          ))}
          {items.map((item, index) => (
            <tr key={`power-${index}`}>
              {index === 0 ? (
                <>
                  <td rowSpan={items.length}>威力</td>
                  <td rowSpan="1">{item.name}</td>
                </>
              ) : (
                <td rowSpan="1">{item.name}</td>
              )}
              {Array.from({ length: 10 }, (_, i) => {
                const powerValue = Array.isArray(item.power)
                  ? (item.power[i] ?? "")
                  : item.power
                    ? (item.power.toString()[i] ?? "")
                    : "";
                const displayValue =
                  powerValue === "-"
                    ? "-"
                    : item.ammunition && i >= 1 && powerValue
                    ? `(${powerValue})`
                    : powerValue;
                return <td key={`power-${index}-${i}`}>{displayValue}</td>;
              })}
              {index === 0 ? (
                <>
                  <td rowSpan={items.length}>破壊力</td>
                  <td>{item.destructive_power || ""}</td>
                </>
              ) : (
                <td>{item.destructive_power || ""}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShootingTypesViewer;
