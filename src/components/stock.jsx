import { useState, useEffect } from "react";
import "./stock.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Card } from "./card";
const axios = require("axios");
const link = "https://stocks-json-data.herokuapp.com/";

export function Stoks() {
  const [stockdata, setStockata] = useState([]);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState([]);
  const [hover, setHover] = useState([]);
  const [watch, setWach] = useState(false);
  const [card, setCard] = useState(false);
  const [formet, setFormet] = useState(false);
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState();
  useEffect(() => {
    async function showData() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=50&page=${
            page ? page : "1"
          }&sparkline=false`
        );

        setStockata(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    showData();
  }, [update, sort, page]);

  async function showSearchData() {
    const filter = stockdata.filter((e) => {
      return e.name.toLowerCase().includes(search.toLowerCase());
    });
    setShow(filter);
    setCard(false);
  }

  async function showUpdate(e) {
    try {
      await axios.patch(`${link}stocksData/${e.id}`, {
        list: e.list ? false : true,
      });
      await showSearchData();
      setUpdate(update ? false : true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div
      className="box"
      onClick={(el) => {
        el.stopPropagation();
        console.log(el.target.nodeName);
        if (el.target.nodeName !== "svg" && el.target.nodeName !== "INPUT") {
          setWach(false);
          setSearch("");
        }
      }}
    >
      <div id="main-box">
        <div id="input">
          <div>
            {" "}
            {watch ? (
              <></>
            ) : card ? (
              <CancelIcon
                onClick={() => {
                  setCard(!card);
                }}
              />
            ) : (
              <SettingsIcon
                onClick={() => {
                  setCard(!card);
                }}
              />
            )}
          </div>
          <h3>{watch ? "ADD STOCKS..." : "YOUR WATHLIST "}</h3>
          <h4>{stockdata.length}</h4>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              setWach(true);
              showSearchData();
            }}
            value={search}
            onKeyPress={(en) => {
              if (en.code === "Enter") {
                setWach(true);
                showSearchData();
                console.log(en.code);
              }
            }}
            type="text"
            placeholder="Search Stocks..."
            id=""
          />
        </div>

        <div style={{ width: "100%", height: "85px" }}></div>
        <Card value={card} formet={setFormet} sort={sort} setsort={setSort} />

        <div>
          {watch
            ? show.map((el) => (
                <div
                  key={`${el.id}A`}
                  onMouseOver={() => {
                    setHover(el.id);
                  }}
                  onMouseOut={() => {
                    setHover();
                  }}
                  className="stock-list"
                >
                  <div
                    style={{
                      color:
                        el.price_change_percentage_24h < 0
                          ? "#df514c"
                          : "green",
                    }}
                  >
                    {el.name}
                  </div>
                  <div>
                    <img style={{ width: "70%" }} src={el.image} alt="" />
                  </div>
                  <div>{el.price_change_percentage_24h} %</div>
                  {el.price_change_percentage_24h < 0 ? (
                    <KeyboardArrowDownIcon
                      style={{
                        color:
                          el.price_change_percentage_24h < 0
                            ? "#df514c"
                            : "green",
                      }}
                    />
                  ) : (
                    <KeyboardArrowUpIcon
                      style={{
                        color:
                          el.price_change_percentage_24h < 0
                            ? "#df514c"
                            : "green",
                      }}
                    />
                  )}

                  <div
                    style={{
                      color:
                        el.price_change_percentage_24h < 0
                          ? "#df514c"
                          : "green",
                    }}
                  >
                    {el.current_price}
                  </div>
                  <div
                    className="stock-pop"
                    style={{
                      display: hover === el.id ? "block" : "none",
                    }}
                  >
                    <ErrorOutlineIcon />
                    {el.list ? (
                      <DeleteOutlineIcon
                        onClick={(e) => {
                          showUpdate(el);
                          console.log(e);
                        }}
                      />
                    ) : (
                      <AddIcon
                        onClick={() => {
                          showUpdate(el);
                          console.log(el);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))
            : stockdata.map((el) => (
                <div
                  key={`${el.id}A`}
                  onMouseOver={() => {
                    setHover(el.id);
                  }}
                  onMouseOut={() => {
                    setHover();
                  }}
                  className="stock-list"
                >
                  <div>
                    <img
                      style={{
                        width: "70%",
                      }}
                      className="stock-list-1"
                      src={el.image}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      color:
                        el.price_change_percentage_24h < 0
                          ? "#df514c"
                          : "green",
                    }}
                    className="stock-list-2"
                  >
                    {el.name}
                  </div>

                  <div>
                    {formet
                      ? el.price_change_24h.toFixed(2)
                      : el.price_change_percentage_24h.toFixed(2) + "  %"}{" "}
                  </div>
                  {el.price_change_percentage_24h < 0 ? (
                    <KeyboardArrowDownIcon
                      style={{
                        color:
                          el.price_change_percentage_24h < 0
                            ? "#df514c"
                            : "green",
                      }}
                    />
                  ) : (
                    <KeyboardArrowUpIcon
                      style={{
                        color:
                          el.price_change_percentage_24h < 0
                            ? "#df514c"
                            : "green",
                      }}
                    />
                  )}

                  <div
                    style={{
                      color:
                        el.price_change_percentage_24h < 0
                          ? "#df514c"
                          : "green",
                    }}
                  >
                    {el.current_price}
                  </div>
                  <div
                    className="stock-pop"
                    style={{
                      display: hover === el.id ? "block" : "none",
                    }}
                  >
                    <ErrorOutlineIcon />
                    <DeleteOutlineIcon
                      onClick={() => {
                        showUpdate(el);
                        console.log(el);
                      }}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div
        style={{
          clear: "both",
          width: "70%",
          height: "4vh",
          margin: "auto",
          background: "white",
        }}
      >
        {" "}
        <Pagination
          onClick={(ell) => {
            console.log(ell.target.innerText);
            setPage(ell.target.innerText);
          }}
          count={10}
        />
      </div>
      {show.length === 0 && stockdata.length === 0 ? (
        <CircularProgress style={{ marginTop: "200px", overflow: "hidden" }} />
      ) : (
        <></>
      )}
    </div>
  );
}
