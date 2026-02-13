import React, { useState, useEffect, useRef } from "react";
import DataViewer from "../DataViewer/DataViewer";
import "./MSDeck.css";

function MSDeck() {
  const [mobileSuits, setMobileSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMS, setSelectedMS] = useState(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const fetchMobileSuits = async () => {
      try {
        const response = await fetch(
          "https://dndhideout.com/gh/gh_backend/public/api/mobile-suits",
        );
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const data = await response.json();
        setMobileSuits(data);
        if (data.length > 0) {
          setSelectedMS(data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileSuits();
  }, []);

  useEffect(() => {
    if (selectedMS && rowRefs.current[selectedMS.id]) {
      rowRefs.current[selectedMS.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMS]);

  const prevMS = () => {
    const index = mobileSuits.findIndex(ms => ms.id === selectedMS.id);
    if (index > 0) {
      setSelectedMS(mobileSuits[index - 1]);
    }
  };

  const nextMS = () => {
    const index = mobileSuits.findIndex(ms => ms.id === selectedMS.id);
    if (index < mobileSuits.length - 1) {
      setSelectedMS(mobileSuits[index + 1]);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div>
      <div className="msdeck-table-container">
        <table className="msdeck-table">
        <thead className="msdeck-thead-sticky">
          <tr>
            <th>ID</th>
            <th>型式番号</th>
            <th>名称</th>
            <th>オプション</th>
          </tr>
        </thead>
        <tbody>
          {mobileSuits.map((ms) => (
            <tr
              key={ms.id}
              ref={(el) => (rowRefs.current[ms.id] = el)}
              onClick={() => setSelectedMS(ms)}
              className={selectedMS && ms.id === selectedMS.id ? "selected" : ""}
            >
              <td>{ms.id}</td>
              <td>{ms.ms_number}</td>
              <td>{ms.ms_name}</td>
              <td>{ms.ms_name_optional || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="msdeck-navigation">
        <button onClick={prevMS} disabled={!selectedMS || mobileSuits.findIndex(ms => ms.id === selectedMS.id) === 0}>←</button>
        <button onClick={nextMS} disabled={!selectedMS || mobileSuits.findIndex(ms => ms.id === selectedMS.id) === mobileSuits.length - 1}>→</button>
      </div>
      <DataViewer data={selectedMS} />
    </div>
  );
}

export default MSDeck;
