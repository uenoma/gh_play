import React, { useState } from 'react';
import './PlotSheet.css';

function PlotSheet({ pilotData }) {
  const [pilotInfo, setPilotInfo] = useState({
    msType: pilotData.msType,
    pilot: pilotData.pilot,
    points: pilotData.points,
    lostPoints: pilotData.lostPoints
  });

  const handlePilotChange = (field, value) => {
    setPilotInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const [weapons, setWeapons] = useState([
    { name: 'ビームライフル', damage: '-', ammo: 3 },
    { name: 'ビームサーベル', damage: '-', ammo: '-' },
    { name: 'シールド', damage: '2', ammo: '-' }
  ]);

  const handleWeaponChange = (index, field, value) => {
    setWeapons(prevWeapons => {
      const newWeapons = [...prevWeapons];
      newWeapons[index][field] = value;
      return newWeapons;
    });
  };

  // 列幅の定義
  const columnWidths = {
    inning: '15px',        // イニング
    movePlan: '90px',     // 移動計画
    evasion: '15px',       // 回避運動
    rmCm: '15px',          // RM・CM
    hex: '50px',           // ヘックス
    direction: '15px',     // 方向
    altitude: '15px',      // 高度
    inertiaSpeed: '30px',  // 慣性・速度 (各列)
    propellant: '15px',    // 推進剤残量 (各列)
    pilotPoints: '15px',   // パイロットポイント (各列)
    movement: '60px',      // 運動
    attackMemo: '90px'    // 攻撃計画メモ
  };

  const [actions, setActions] = useState([
    { inning: 0, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 2, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 3, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 4, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 5, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 6, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 7, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 8, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 9, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 10, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
  ]);

  const handleInputChange = (rowIndex, field, value, subIndex = null) => {
    setActions(prevActions => {
      const newActions = [...prevActions];
      if (subIndex !== null) {
        newActions[rowIndex][field][subIndex] = value;
      } else {
        newActions[rowIndex][field] = value;
      }
      return newActions;
    });
  };

  return (
    <div className="plot-PlotSheet">
      <div className="plot-tables-container">
        <div className="plot-pilot-table-container">
          <table className="plot-pilot-table">
            <tbody>
              <tr>
                <th>機種</th>
                <td><input type="text" value={pilotInfo.msType} onChange={(e) => handlePilotChange('msType', e.target.value)} style={{ width: '100%' }} /></td>
              </tr>
              <tr>
                <th>パイロット</th>
                <td><input type="text" value={pilotInfo.pilot} onChange={(e) => handlePilotChange('pilot', e.target.value)} style={{ width: '100%' }} /></td>
              </tr>
              <tr>
                <th>パイロットポイント</th>
                <td><input type="text" value={pilotInfo.points} onChange={(e) => handlePilotChange('points', e.target.value)} style={{ width: '100%' }} /></td>
              </tr>
              <tr>
                <th>ロストパイロットポイント</th>
                <td><input type="text" value={pilotInfo.lostPoints} onChange={(e) => handlePilotChange('lostPoints', e.target.value)} style={{ width: '100%' }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plot-weapon-table-container">
          <table className="plot-weapon-table">
            <thead>
              <tr>
                <th>武装名</th>
                <th>被ダメージ</th>
                <th>残弾数</th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon, index) => (
                <tr key={index}>
                  <td>{weapon.name}</td>
                  <td><input type="text" value={weapon.damage} onChange={(e) => handleWeaponChange(index, 'damage', e.target.value)} style={{ width: '100%' }} /></td>
                  <td><input type="text" value={weapon.ammo} onChange={(e) => handleWeaponChange(index, 'ammo', e.target.value)} style={{ width: '100%' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="plot-action-table-container">
        <table className="plot-action-table">
          <thead>
            <tr>
              <th rowSpan="2" style={{ width: columnWidths.inning }}>イニング</th>
              <th rowSpan="2" style={{ width: columnWidths.movePlan }}>移動計画</th>
              <th rowSpan="2" style={{ width: columnWidths.evasion }}>回避運動</th>
              <th rowSpan="2" style={{ width: columnWidths.rmCm }}>R M ・ C M</th>
              <th rowSpan="2" style={{ width: columnWidths.hex }}>ヘックス</th>
              <th rowSpan="2" style={{ width: columnWidths.direction }}>方向</th>
              <th rowSpan="2" style={{ width: columnWidths.altitude }}>高度</th>
              <th rowSpan="2" colSpan="3" style={{ width: `calc(${columnWidths.inertiaSpeed} * 3)` }}>慣性・速度</th>
              <th rowSpan="1" colSpan="9" style={{ width: `calc(${columnWidths.propellant} * 9)` }}>推進剤残量</th>
              <th rowSpan="1" colSpan="3" style={{ width: `calc(${columnWidths.pilotPoints} * 3)` }}>パイロットポイント</th>
              <th rowSpan="2" style={{ width: columnWidths.movement }}>運動</th>
              <th rowSpan="2" style={{ width: columnWidths.attackMemo }}>攻撃計画メモ</th>
            </tr>
            <tr>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.propellant }}></th>
              <th style={{ width: columnWidths.pilotPoints }}>確認</th>
              <th style={{ width: columnWidths.pilotPoints }}>命中</th>
              <th style={{ width: columnWidths.pilotPoints }}>回避</th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action, index) => (
              <tr key={index}>
                <td style={{ width: columnWidths.inning }}>{index === 0 ? 'S' : index}</td>
                <td style={{ width: columnWidths.movePlan }}><input type="text" value={action.movePlan} onChange={(e) => handleInputChange(index, 'movePlan', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.evasion }}><input type="text" value={action.evasion} onChange={(e) => handleInputChange(index, 'evasion', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.rmCm }}><input type="text" value={action.rmCm} onChange={(e) => handleInputChange(index, 'rmCm', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.hex }}><input type="text" value={action.hex} onChange={(e) => handleInputChange(index, 'hex', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.direction }}><input type="text" value={action.direction} onChange={(e) => handleInputChange(index, 'direction', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.altitude }}><input type="text" value={action.altitude} onChange={(e) => handleInputChange(index, 'altitude', e.target.value)} style={{ width: '100%' }} /></td>
                {action.inertiaSpeed.map((speed, speedIndex) => (
                  <td key={speedIndex} style={{ width: columnWidths.inertiaSpeed }}><input type="text" value={speed} onChange={(e) => handleInputChange(index, 'inertiaSpeed', e.target.value, speedIndex)} style={{ width: '100%' }} /></td>
                ))}
                {action.propellant.map((prop, propIndex) => (
                  <td key={propIndex} style={{ width: columnWidths.propellant }}><input type="text" value={prop} onChange={(e) => handleInputChange(index, 'propellant', e.target.value, propIndex)} style={{ width: '100%' }} /></td>
                ))}
                {action.pilotPoints.map((point, pointIndex) => (
                  <td key={pointIndex} style={{ width: columnWidths.pilotPoints }}><input type="text" value={point} onChange={(e) => handleInputChange(index, 'pilotPoints', e.target.value, pointIndex)} style={{ width: '100%' }} /></td>
                ))}
                <td style={{ width: columnWidths.movement }}><input type="text" value={action.movement} onChange={(e) => handleInputChange(index, 'movement', e.target.value)} style={{ width: '100%' }} /></td>
                <td style={{ width: columnWidths.attackMemo }}><input type="text" value={action.attackMemo} onChange={(e) => handleInputChange(index, 'attackMemo', e.target.value)} style={{ width: '100%' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlotSheet;
