import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { addTokens, removeToken } from "../../redux/portfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTokens, searchTokens, clearSearch } from "../../redux/tokenSlice";

import check_circle from "../../assets/check_circle.svg";
import star from "../../assets/star.svg";
import Button from "../../commonComponents/Button";

export default function AddTokenModal({ open, onClose }) {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const portfolio = useSelector((s) => s.portfolio.tokens || []);
  const { list, searchList, page, hasMore, loading, searching } = useSelector(
    (s) => s.tokens
  );
 const [selectedTokens, setSelectedTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const tokensToShow = searchTerm ? searchList : list;

  const handleAddTokens = () => {
  const tokensToAdd = tokensToShow.filter(
    (t) => selectedTokens.includes(t.id) && !portfolio.find((p) => p.id === t.id)
  );

  const tokensToRemove = portfolio.filter(
    (t) => !selectedTokens.includes(t.id)
  );

  if (tokensToAdd.length > 0) {
    dispatch(addTokens(tokensToAdd));
  }

  tokensToRemove.forEach((t) => dispatch(removeToken(t.id)));

  onClose();
};


const toggleSelection = (id) => {
  if (selectedTokens.includes(id)) {
    setSelectedTokens((prev) => prev.filter((x) => x !== id));
  } else {
    setSelectedTokens((prev) => [...prev, id]);
  }
};

  // -----------Infinite scroll which handles a pagination on user scrcoll------
  let isScrolling = false;

  const handleScroll = () => {
    if (isScrolling) return;
    isScrolling = true;

    setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;

      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
        if ((!loading && !searching, hasMore)) {
          dispatch(getTokens({ page: page + 1 }));
        }
      }

      isScrolling = false;
    }, 300);
  };

useEffect(() => {
  if (open) {
    setSelectedTokens(portfolio.map((t) => t.id));
    dispatch(getTokens({ page: 1 }));
  }
}, [open, portfolio]);

  // ------------search debounce----------
  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(clearSearch());
      dispatch(getTokens({ page: 1 }));
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(searchTokens(searchTerm));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  if (!open) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Search token (e.g., ETH, SOL)"
          className="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <p className="label">Trending</p>

        <div className="tokenList" onScroll={handleScroll} ref={scrollRef}>
          {tokensToShow.map((t) => {
            const isSelected = selectedTokens.includes(t.id);

            return (
              <div
                key={t.id}
                className={`tokenRow ${isSelected ? "selectedRow" : ""}`}
                onClick={() => toggleSelection(t.id)}
              >
                <div className="left">
                  <img src={t.image || t.img} alt="" />
                  <span>
                    {t.name} ({t.symbol})
                  </span>
                </div>

                <div className="right">
                  {isSelected ? (
                    <>
                      <img src={star} alt="" />
                      <img src={check_circle} alt="" />
                    </>
                  ) : (
                    <span className="radio"></span>
                  )}
                </div>
              </div>
            );
          })}

          {(loading || searching) && <p className="loading">Loading...</p>}
        </div>

        <div className="footer">
          <Button
            onClick={handleAddTokens}
            disabled={selectedTokens.length === 0}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
