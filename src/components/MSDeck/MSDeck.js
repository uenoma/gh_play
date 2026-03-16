import React, { useState, useEffect, useRef } from "react";
import DataViewer from "../DataViewer/DataViewer";
import MSList from "./MSList";
import "./MSDeck.css";
import "../Common.css";
import { getMobileSuits, getGameSession, selectSessionMobileSuit } from "../../common/ApiWrapper";

function MSDeck({ selectedSession, authUser }) {
  const [mobileSuits, setMobileSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMS, setSelectedMS] = useState(null);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [selectLoading, setSelectLoading] = useState(false);
  const [selectError, setSelectError] = useState(null);

  useEffect(() => {
    const fetchMobileSuits = async () => {
      try {
        const data = await getMobileSuits();
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

  const loadSessionData = async () => {
    if (!selectedSession) {
      setSessionData(null);
      return;
    }
    try {
      const data = await getGameSession(selectedSession.id);
      setSessionData(data);
    } catch (_) {
      setSessionData(null);
    }
  };

  useEffect(() => {
    loadSessionData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSession]);

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

  const isMember = authUser && sessionData &&
    sessionData.members?.some((m) => m.id === authUser.id);
  const mySelectedMSId = isMember
    ? sessionData.members.find((m) => m.id === authUser.id)?.pivot?.mobile_suit_id
    : null;
  const isMyMS = selectedMS && mySelectedMSId === selectedMS.id;

  const handleSelectMS = async () => {
    if (!selectedSession || !selectedMS) return;
    setSelectLoading(true);
    setSelectError(null);
    try {
      await selectSessionMobileSuit(selectedSession.id, isMyMS ? null : selectedMS.id);
      await loadSessionData();
    } catch (err) {
      setSelectError(err.message);
    } finally {
      setSelectLoading(false);
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
      {isMember && selectedMS && (
        <div className="msdeck-select-bar">
          {mySelectedMSId && !isMyMS && (
            <span className="msdeck-current-ms">
              現在の選択機体: {mobileSuits.find((ms) => ms.id === mySelectedMSId)?.ms_name ?? `ID:${mySelectedMSId}`}
            </span>
          )}
          <button
            className={`msdeck-select-btn${isMyMS ? " msdeck-select-btn--active" : ""}`}
            onClick={handleSelectMS}
            disabled={selectLoading}
          >
            {selectLoading ? "処理中..." : isMyMS ? "選択解除" : "この機体を使用する"}
          </button>
          {selectError && <span className="msdeck-select-error">{selectError}</span>}
        </div>
      )}
      <div className="msdeck-data-viewer">
        <DataViewer data={selectedMS} />
      </div>
    </div>
  );
}

export default MSDeck;
