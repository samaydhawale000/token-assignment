import React, { useEffect, useState } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { updateHoldings, removeToken, refreshPortfolioPrices } from "../../redux/portfolioSlice";
import star from "../../assets/star.svg";
import plus from "../../assets/plus.svg";
import refresh from "../../assets/refresh.svg";
import more from "../../assets/more.svg";
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import BlackButton from "../../commonComponents/BlackButton";
import Button from "../../commonComponents/Button";
import Sparkline from "./Sparkline";
import AddTokenModal from "./AddTokenModal";
import Footer from "./Footer";


export default function Wishlist() {
  const [openIndex, setOpenIndex] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const portfolio = useSelector((s) => s.portfolio.tokens || []);
  const { refreshLoading } = useSelector((s) => s.portfolio);
  const dispatch = useDispatch();
  const [tempData, setTempData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = tempData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tempData.length / itemsPerPage);

  useEffect(() => {
    if (!openEdit) {
      setTempData(JSON.parse(JSON.stringify(portfolio)));
    }
  }, [portfolio, openEdit]);

  useEffect(() => {
    const handler = (e) => {
      const menu = e.target.closest(".menuCell");
      const input = e.target.closest(".holdingWrapper");

      if (!menu && !input) {
        setOpenIndex(null);
        setOpenEdit(false);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="wishlistContainer">
      <div>
        <div>
          <span>
            <img src={star} alt="plus" />
            <p>Wishlist</p>
          </span>
        </div>

        <div>
          <BlackButton   onClick={() => dispatch(refreshPortfolioPrices())}>
            <img src={refresh} alt="plus Icon" className={refreshLoading ? 'loadIcon' : ''} />{" "}
            <span className="refreshButton"> Refresh Prices</span>
          </BlackButton>

          <Button style={{ borderRadius: "7px" }} onClick={() => setOpen(true)}>
            <img src={plus} alt="plus Icon" /> Add Token
          </Button>
        </div>
      </div>

      <div className="tableWrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th className="col_250px">Token</th>
              <th className="col_150px">Price</th>
              <th className="col_150px">24h %</th>
              <th className="col_200px">Sparkline (7d)</th>
              <th className="col_200px">Holdings</th>
              <th className="col_150px">Value</th>
              <th className="col_50px"></th>
            </tr>
          </thead>

          <tbody>
            {currentPageData?.map((item, index) => {
              const realIndex = startIndex + index;
              return (
                <tr key={item.id}>
                  <td className="tableNameWrapper">
                    <img src={item.image} alt="coin icon" /> {item.name} <span style={{color:'rgba(161, 161, 170, 1)'}}>({item.symbol})</span>
                  </td>

                  <td style={{ color: "#A1A1AA" }}>
                    ${item.price || item.current_price || "--"}
                  </td>

                  <td style={{ color: "#A1A1AA" }}>
                    {item.price_change_24h?.toFixed(2) || "--"}%
                  </td>

                  <td>
                    <Sparkline
                      prices={item.sparkline_in_7d?.price || []}
                      color={item.price_change_24h >= 0 ? "#32CD32" : "red"}
                    />
                  </td>

                  <td
                    className="holdingWrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {openEdit && openIndex === realIndex ? (
                      <>
                        <input
                          type="number"
                          value={tempData[realIndex].holdings ?? ""}
                          onChange={(e) => {
                            const copy = [...tempData];
                            copy[realIndex].holdings = e.target.value;
                            setTempData(copy);
                          }}
                        />

                        <Button
                          style={{ borderRadius: "7px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(false);

                            dispatch(
                              updateHoldings({
                                id: item.id,
                                holdings: Number(
                                  tempData[realIndex].holdings || 0
                                ),
                              })
                            );

                            setOpenIndex(null);
                          }}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <p>{item.holdings || "--"}</p>
                    )}
                  </td>

                  <td>{item.value?.toFixed(2) || "--"}</td>

                  <td className="menuCell">
                    <img
                      src={more}
                      alt="more icon"
                      className="moreIcon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenEdit(false);
                        setOpenIndex(realIndex);
                      }}
                    />

                    {openIndex === realIndex && (
                      <div className="editDeletePopup">
                        <div
                          className="popupItem"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenEdit(true);
                          }}
                        >
                          <img src={edit} alt="coin icon" /> Edit Holdings
                        </div>

                        <div
                          className="popupItem delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeToken(item.id));
                            setOpenIndex(null);
                          }}
                        >
                          <img src={deleteIcon} alt="coin icon" /> Remove
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {tempData.length === 0 && (
          <h6 className="noDataAvailableWrapper">No Data Available</h6>
        )}
        {tempData.length > 0 && <Footer page={page} setPage={setPage} tempData={tempData} startIndex={startIndex } endIndex={endIndex } totalPages={totalPages }/>}
        
      </div>

      <AddTokenModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
