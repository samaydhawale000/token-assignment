import React from "react";
import "./home.css";

export default function Footer({page, setPage, tempData, startIndex, endIndex, totalPages }) {
  return (
    <div className="tableFooter">
      <p>
        {startIndex + 1} - {Math.min(endIndex, tempData.length)} of{" "}
        {tempData.length} results
      </p>

      <div>
        <p>
          {page} of {totalPages} pages
        </p>

        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
