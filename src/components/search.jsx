import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { getDocs } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { doc, deleteDoc } from "firebase/firestore";
import { db, collection, addDoc } from "../firebase";

export default function Search({ value }) {
  //   const [data, setData] = useState([]);
  const uid = JSON.parse(localStorage.getItem("auth")).uid;
  const [pro, setPro] = useState(false);

  ///////////////////////////////////////////////////////////////
  
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, uid));
    let arr = [];
    querySnapshot.forEach(async (doc) => {
      arr.push(doc.data());
    });
    value.setWatchList(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //////////////////////////////////////////////////////////////

  async function addcrypto(el) {
    setPro(true);
    await fetchData();
    await addDoc(collection(db, uid), el);
    await fetchData();
    await  setPro(false);
  }

  ////////////////////////////////////////////////////////////////

  async function showUpdate(el) {
    setPro(true);
    const querySnapshot = await getDocs(collection(db, uid));
    let id;
    querySnapshot.forEach(async (doc) => {
      if (doc.data().id === el.id) {
        id = doc.id;
      }
    });
    await deleteDoc(doc(db, uid, id));
    await fetchData();
    await setPro(false);
  }

  ///////////////////////////////////////////////////////////////

  return (
    <>
      {value.show.map((el) => (
        <div
          key={`${el.id}A`}
          onMouseEnter={() => {
            value.setHover(el.id);
          }}
          onMouseLive={() => {
            value.setHover();
          }}
          className="stock-list"
        >
          <div>
            <img style={{ width: "70%" }} src={el.image} alt="" />
          </div>
          <div
            style={{
              color: el.price_change_percentage_24h < 0 ? "#df514c" : "green",
            }}
          >
            {el.name}
          </div>

          <div>{el.price_change_percentage_24h} %</div>
          {el.price_change_percentage_24h < 0 ? (
            <KeyboardArrowDownIcon
              style={{
                color: el.price_change_percentage_24h < 0 ? "#df514c" : "green",
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              style={{
                color: el.price_change_percentage_24h < 0 ? "#df514c" : "green",
              }}
            />
          )}

          <div
            style={{
              color: el.price_change_percentage_24h < 0 ? "#df514c" : "green",
            }}
          >
            {el.current_price}
          </div>
          <div
            className="stock-pop"
            style={{
              display: value.hover === el.id ? "block" : "none",
            }}
          >
            {pro ? (
              <CircularProgress />
            ) : value.watchList.filter((e) => {
                return e.id === el.id;
              })[0] ? (
              <DeleteOutlineIcon
                onClick={(e) => {
                  showUpdate(el);
                  console.log(e);
                }}
              />
            ) : (
              <AddIcon
                onClick={() => {
                  addcrypto(el);
                  console.log(el);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
