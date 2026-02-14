import React from 'react';
import './PlotSheet.css';

function PlotSheet({ pilotData }) {
  const weapons = [
    { name: 'ビームライフル', damage: '-', ammo: 3 },
    { name: 'ビームサーベル', damage: '-', ammo: '-' },
    { name: 'シールド', damage: '2', ammo: '-' }
  ];

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
    attackMemo: '100px'    // 攻撃計画メモ
  };

  const actions = [
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
    { inning: 1, movePlan: '1-3,r,2-5,T', evasion: '12', rmCm: '', hex: '2030', direction: '6', altitude: '', inertiaSpeed: ['1-2', '3-5', 'U-2'], propellant: [80, 75, 70, 65, 60, 55, 50, 45, 40], pilotPoints: [2, 10, 8], movement: 'CE2 S3 F1', attackMemo: 'BS上段斬る' },
  ];

  return (
    <div className="plot-PlotSheet">
      <div className="plot-tables-container">
        <div className="plot-pilot-table-container">
          <table className="plot-pilot-table">
            <tbody>
              <tr>
                <th>機種</th>
                <td>{pilotData.msType}</td>
              </tr>
              <tr>
                <th>パイロット</th>
                <td>{pilotData.pilot}</td>
              </tr>
              <tr>
                <th>パイロットポイント</th>
                <td>{pilotData.points}</td>
              </tr>
              <tr>
                <th>ロストパイロットポイント</th>
                <td>{pilotData.lostPoints}</td>
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
                  <td>{weapon.damage}</td>
                  <td>{weapon.ammo}</td>
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
                <td style={{ width: columnWidths.inning }}>{action.inning}</td>
                <td style={{ width: columnWidths.movePlan }}>{action.movePlan}</td>
                <td style={{ width: columnWidths.evasion }}>{action.evasion}</td>
                <td style={{ width: columnWidths.rmCm }}>{action.rmCm}</td>
                <td style={{ width: columnWidths.hex }}>{action.hex}</td>
                <td style={{ width: columnWidths.direction }}>{action.direction}</td>
                <td style={{ width: columnWidths.altitude }}>{action.altitude}</td>
                {action.inertiaSpeed.map((speed, speedIndex) => (
                  <td key={speedIndex} style={{ width: columnWidths.inertiaSpeed }}>{speed}</td>
                ))}
                {action.propellant.map((prop, propIndex) => (
                  <td key={propIndex} style={{ width: columnWidths.propellant }}>{prop}</td>
                ))}
                {action.pilotPoints.map((point, pointIndex) => (
                  <td key={pointIndex} style={{ width: columnWidths.pilotPoints }}>{point}</td>
                ))}
                <td style={{ width: columnWidths.movement }}>{action.movement}</td>
                <td style={{ width: columnWidths.attackMemo }}>{action.attackMemo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlotSheet;
