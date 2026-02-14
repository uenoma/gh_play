import React, { useRef, useEffect } from "react";
import "../Common.css";

function MSList({ mobileSuits, selectedMS, onSelectMS, searchTerm, sortKey, sortOrder, handleSort }) {
  const rowRefs = useRef([]);

  useEffect(() => {
    if (selectedMS && rowRefs.current[selectedMS.id]) {
      rowRefs.current[selectedMS.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedMS]);

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
        {filteredMobileSuits.map((ms) => (
          <tr
            key={ms.id}
            ref={(el) => (rowRefs.current[ms.id] = el)}
            onClick={() => onSelectMS(ms)}
            className={
              selectedMS && ms.id === selectedMS.id ? "selected" : ""
            }
          >
            <td>{ms.ms_number}</td>
            <td className="left-align">{ms.ms_name}</td>
            <td className="left-align">{ms.ms_name_optional || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MSList;