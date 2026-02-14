import React, { useState, useEffect, useRef } from "react";
import DataViewer from "../DataViewer/DataViewer";
import MSList from "./MSList";
import "./MSDeck.css";
import "../Common.css";

function MSDeck() {
  const [mobileSuits, setMobileSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMS, setSelectedMS] = useState(null);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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
    return <div className="loading-spinner"></div>;
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

  const filteredMobileSuits = sortedMobileSuits.filter((ms) =>
    ms.ms_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ms.ms_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ms.ms_name_optional && ms.ms_name_optional.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="msdeck-container">
      <div className="edit-container">
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="edit-button" onClick={() => window.open('https://dndhideout.com/gh/data_builder/', '_blank')}>データ編集</button>
      </div>
      <div className="msdeck-table-container">
        <MSList
          mobileSuits={mobileSuits}
          selectedMS={selectedMS}
          onSelectMS={setSelectedMS}
          searchTerm={searchTerm}
          sortKey={sortKey}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
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
