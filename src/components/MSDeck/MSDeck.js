import React, { useState, useEffect, useRef } from "react";
import DataViewer from "../DataViewer/DataViewer";
import "./MSDeck.css";
import "../Common.css";

function MSDeck() {
  const [mobileSuits, setMobileSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMS, setSelectedMS] = useState(null);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
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
      rowRefs.current[selectedMS.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedMS]);

  const prevMS = () => {
    const index = mobileSuits.findIndex((ms) => ms.id === selectedMS.id);
    if (index > 0) {
      setSelectedMS(mobileSuits[index - 1]);
    }
  };

  const nextMS = () => {
    const index = mobileSuits.findIndex((ms) => ms.id === selectedMS.id);
    if (index < mobileSuits.length - 1) {
      setSelectedMS(mobileSuits[index + 1]);
    }
  };

  const firstMS = () => {
    if (mobileSuits.length > 0) {
      setSelectedMS(mobileSuits[0]);
    }
  };

  const lastMS = () => {
    if (mobileSuits.length > 0) {
      setSelectedMS(mobileSuits[mobileSuits.length - 1]);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  const sortedMobileSuits = [...mobileSuits].sort((a, b) => {
    const aValue = a[sortKey] || "";
    const bValue = b[sortKey] || "";
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="msdeck-container">
      <div className="edit-container">
        <button className="edit-button" onClick={() => window.open('https://dndhideout.com/gh/data_builder/', '_blank')}>データ編集</button>
      </div>
      <div className="msdeck-table-container">
        <table className="common-table">
          <thead className="common-thead-sticky">
            <tr>
              <th
                onClick={() => handleSort("ms_number")}
                style={{ cursor: "pointer" }}
              >
                型式番号{" "}
                {sortKey === "ms_number" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("ms_name")}
                style={{ cursor: "pointer" }}
              >
                名称{" "}
                {sortKey === "ms_name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                onClick={() => handleSort("ms_name_optional")}
                style={{ cursor: "pointer" }}
              >
                オプション{" "}
                {sortKey === "ms_name_optional" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMobileSuits.map((ms) => (
              <tr
                key={ms.id}
                ref={(el) => (rowRefs.current[ms.id] = el)}
                onClick={() => setSelectedMS(ms)}
                className={
                  selectedMS && ms.id === selectedMS.id ? "selected" : ""
                }
              >
                <td>{ms.ms_number}</td>
                <td>{ms.ms_name}</td>
                <td>{ms.ms_name_optional || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="msdeck-navigation">
        <button
          onClick={firstMS}
          disabled={!selectedMS || selectedMS.id === mobileSuits[0]?.id}
        >
          |←
        </button>
        <button
          onClick={prevMS}
          disabled={
            !selectedMS ||
            mobileSuits.findIndex((ms) => ms.id === selectedMS.id) === 0
          }
        >
          ←
        </button>
        <button
          onClick={nextMS}
          disabled={
            !selectedMS ||
            mobileSuits.findIndex((ms) => ms.id === selectedMS.id) ===
              mobileSuits.length - 1
          }
        >
          →
        </button>
        <button
          onClick={lastMS}
          disabled={
            !selectedMS ||
            selectedMS.id === mobileSuits[mobileSuits.length - 1]?.id
          }
        >
          →|
        </button>
      </div>
      <div className="msdeck-data-viewer">
        <DataViewer data={selectedMS} />
      </div>
    </div>
  );
}

export default MSDeck;
