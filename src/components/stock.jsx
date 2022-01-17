import { useState, useEffect } from "react";
import "./stock.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import Search from "./search";
import { Card } from "./card";
import { Logout } from "./Logout";
const axios = require("axios");

export function Stoks() {
  const [stockdata, setStockata] = useState([]);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState([]);
  const [show, setShow] = useState([]);
  const [hover, setHover] = useState(false);
  const [watch, setWach] = useState(false);
  const [card, setCard] = useState(false);
  const [formet, setFormet] = useState(false);
  const [sort, setSort] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const [showLog, setShowLog] = useState(false);

  const uid = JSON.parse(localStorage.getItem("auth"));

  ///////////////////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function showData() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=300&page=1&sparkline=false`
        );

        setStockata(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    showData();
  }, [update, sort]);

  //////////////////////////////////////////////////////////

  const fetchData = async (e) => {
    const querySnapshot = await getDocs(collection(db, uid.uid));
    let arr = [];
    querySnapshot.forEach(async (doc) => {
      arr.push(doc.data());
    });
    setWatchList(arr);
  };

  /////////////////////////////////////////////////////////

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sort) {
      watchList.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      fetchData();
    }
  }, [sort]);

  ////////////////////////////////////////////////////////

  async function showSearchData() {
    const filter = stockdata.filter((e) => {
      return e.name.toLowerCase().includes(search.toLowerCase());
    });
    setShow(filter);
    setCard(false);
  }

  ////////////////////////////////////////////////////////////

  async function showUpdate(el) {
    const querySnapshot = await getDocs(collection(db, uid.uid));
    let id;
    querySnapshot.forEach(async (doc) => {
      if (doc.data().id === el.id) {
        id = doc.id;
      }
    });
    await deleteDoc(doc(db, uid.uid, id));
    await fetchData();
  }

  /////////////////////////////////////////////////////////////////

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
          <img
            onClick={() => {
              setShowLog(!showLog);
            }}
            src={uid.profilePic}
            alt=""
          />
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
          <Logout showLog={showLog} />
        </div>

        <Card value={card} formet={setFormet} sort={sort} setsort={setSort} />

        <div className="scrool-box">
          {watch ? (
            <Search
              value={{
                show,
                setHover,
                setUpdate,
                hover,
                setWatchList,
                watchList,
              }}
            />
          ) : (
            watchList.map((el) => (
              <div
                key={`${el.id}A`}
                onMouseEnter={() => {
                  setHover(el.id);
                  console.log(hover);
                }}
                onMouseLeave={() => {
                  console.log(hover);
                  setHover(false);
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
                      el.price_change_percentage_24h < 0 ? "#df514c" : "green",
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
                      el.price_change_percentage_24h < 0 ? "#df514c" : "green",
                  }}
                >
                  {el.current_price}
                </div>
                <div className="stock-pop">
                  <DeleteOutlineIcon
                    onClick={() => {
                      console.log(el);
                      showUpdate(el);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {show.length === 0 && stockdata.length === 0 ? (
        <CircularProgress style={{ marginTop: "200px", overflow: "hidden" }} />
      ) : (
        <></>
      )}
    </div>
  );
}
