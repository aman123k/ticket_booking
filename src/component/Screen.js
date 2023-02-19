import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { PVR } from "../data/malls";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

function Screen() {
  const { Name, showTime, malls } = useParams();
  const [selectedCeats, setSelectedCeats] = useState([]);
  const [ceats, setCeats] = useState([]);
  const [zip, setZip] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const navigation = useNavigate();
  const cardNoPattern = /\b\d{4}\s\d{4}\s\d{4}\s\d{4}/;
  const datePattern = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
  const cvvPattern = /\b([1-9][0-9][0-9])\b/;
  const cord = /([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})/;
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(false);

  const screens = PVR.filter((data) => {
    return data.name === Name;
  });

  useEffect(() => {
    const thisShow = JSON.parse(localStorage.getItem(Name));
    if (thisShow) {
      setCeats(thisShow);
    } else {
      setCeats(screens[0].totalCeat);
    }
  }, [Name, screens]);
  const bookSeat = (ceat) => {
    const ceatsPrice = screens[0].totalCeat.filter((ceats) => {
      return ceats.name === ceat;
    })[0].price;
    if (selectedCeats.includes(ceat)) {
      setSelectedCeats(() =>
        selectedCeats.filter((id) => {
          return ceat !== id;
        })
      );
      setPrice(price - ceatsPrice);
    } else {
      setSelectedCeats((previous) => {
        return [...previous, ceat];
      });
      setPrice(price + ceatsPrice);
    }
  };

  const procidePayment = () => {
    if (zip === "" && card === "" && date === "" && cvv === "" && city === "") {
      return (
        setError("Pelese enter card details"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    } else if (!card.match(cardNoPattern)) {
      return (
        setError("Pelese enter valid card number"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    } else if (!date.match(datePattern)) {
      console.log("hello");
      return (
        setError("Pelese enter Card Expriy date"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    } else if (city === "") {
      console.log("hello");
      return (
        setError("Pelese select City"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    } else if (!cvv.match(cvvPattern)) {
      return (
        setError("Pelese enter valid Cvv Number"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    } else if (!zip.match(cord)) {
      return (
        setError("Pelese enter valid Zip cord"),
        setTimeout(() => {
          setError("");
        }, 1500)
      );
    }
  };
  return (
    <section className="bg-[#06060D] h-min relative pb-0.5 ">
      <header
        className=" flex items-center justify-between
         px-2 pt-4 pb-2.5 text-white "
      >
        <div className=" flex items-center">
          <button
            onClick={() =>
              setTimeout(() => {
                navigation(-1);
              }, 200)
            }
            className=" text-lg font-bold cursor-pointer mr-2 mb-0.5"
          >
            <ArrowBackRoundedIcon />
          </button>
          <div className="flex flex-col">
            <p className="text-[16.5px] tracking-wide">{showTime}</p>
            <p className="text-xs tracking-wider mt-[-1px] text-[#f3f0f0]">
              {Name}
            </p>
          </div>
        </div>
        <div className=" flex gap-1">
          <ShareRoundedIcon className=" cursor-pointer" />
        </div>
      </header>
      <div className=" text-center mt-3">
        <p className="text-[#FAD73A] text-[0.840rem] font-semibold tracking-wide">
          {malls}
        </p>
        <span className="text-[#f3efec] text-sm tracking-wide mt-0.5">
          CLASSIC 240
        </span>
      </div>
      <section>
        {/* All seats render */}
        <ul
          className=" grid gap-y-3.5 gap-x-3 text-center text-white px-3 mt-7"
          style={{
            gridTemplateColumns: `repeat(${screens[0].ceatRow}, minmax(0, 1fr)`,
          }}
        >
          {ceats.map((ceat) => {
            // seatsbackground color
            let backgroundColor = "";
            if (ceat.ceat_available === "available") {
              backgroundColor = "bg-[#4d4b4b]";
            } else if (ceat.ceat_available === "block") {
              backgroundColor = "bg-[#175a6b]";
            } else {
              backgroundColor = "bg-[#c07f1e]";
            }
            return (
              <div key={ceat.id} className=" relative">
                <li
                  className={` rounded-md py-[.23rem] cursor-pointer
                 text-[15px] tracking-wider ${backgroundColor}  `}
                  style={{
                    backgroundColor: selectedCeats.includes(ceat.name)
                      ? "green"
                      : "",
                    font: selectedCeats.includes(ceat.name) ? "400px" : "",
                  }}
                  onClick={() => {
                    if (ceat.ceat_available === "available") {
                      bookSeat(ceat.name);
                    } else {
                      alert(`Seat is ${ceat.ceat_available}`);
                    }
                  }}
                >
                  {ceat.name}
                </li>
                <div
                  className="absolute top-[-8px] left-[-4px] text-xs "
                  style={{
                    display: ceat.ceat_type === "premium" ? "block" : "none",
                  }}
                >
                  👑
                </div>
              </div>
            );
          })}
        </ul>

        <div className="text-white flex justify-center gap-7 py-3.5  bg-[#222222] mt-8 mb-7">
          <div className="flex flex-col items-center gap-1">
            <div className=" w-[1.3rem] h-[1.3rem] rounded-sm bg-[#4d4b4b] p-2"></div>
            <p>Available</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className=" w-[1.3rem] h-[1.3rem] rounded-sm bg-[#008000] p-2"></div>
            <p>Selected</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className=" w-[1.3rem] h-[1.3rem] rounded-sm bg-[#c07f1e] p-2"></div>
            <p>Booked</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className=" w-[1.3rem] h-[1.3rem] rounded-sm bg-[#175a6b] p-2"></div>
            <p>Blocked</p>
          </div>
        </div>
        <div className="text-white px-3 flex justify-between items-center">
          <div>
            <p className="mb-2">Show time End : {malls}</p>
            <div>
              <p>Selected Seats Name :</p>
              <ul className="grid gap-3 w-40 grid-cols-4 mt-3 mb-5">
                {selectedCeats.map((selectedCeat) => (
                  <li className=" bg-[#FF4546] rounded-md px-1.5 py-1">
                    {selectedCeat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className=" w-40 bg-[#222222] rounded-md px-4 py-3">
            Seat with Crown is a Premium Seat
          </p>
        </div>

        <div className=" bg-[#FAD73A] flex justify-between px-3 py-2.5 mb-4 mt-3 items-center">
          <p className=" font-normal">Toatal Amount : {price}</p>
          <button
            onClick={() =>
              price ? setPayment(!payment) : alert("please select seat ")
            }
            className="bg-blue-400 rounded-md p-2 text-[#130e0e]"
          >
            Click to Pay
          </button>
        </div>
      </section>
      {/* 
      bular background
       */}
      <div
        className={` fixed w-full h-screen bg-[#0f0f0f] 
        backdrop-opacity-10 opacity-30 bottom-0 ease-in-out 
         ${payment ? "left-0" : "left-[-100%]"}`}
      ></div>
      {/* 
      Payment seat
       */}
      <div
        className={`absolute bg-[#06060D] rounded-t-lg bottom-0  w-full h-min duration-700 px-3 
       ease-in-out ${payment ? "left-0" : "left-[-100%] "} rounded-t-md`}
      >
        <header className="mt-3 mb-2 text-white ">
          <div className=" flex items-center gap-2">
            <span onClick={() => setPayment(!payment)}>
              <ClearRoundedIcon />
            </span>
            <span
              className="text-[#130e0e] font-semibold text-[13px] px-2 py-1.5
             rounded-md bg-[#FAD73A] tracking-wide"
            >
              TEST MODEL
            </span>
          </div>
          <p className=" tracking-wide mt-1.5">Add your payment information</p>
        </header>
        <div>
          <div className=" px-.5 rounded-md text-white ">
            <p className="text-[14px] tracking-wider">Card information</p>
            <section className=" border bg-[#4D4B4B] rounded-md border-[#837c7c] overflow-hidden mt-2 ">
              <div className="flex flex-col">
                <span className="text-sm px-1.5 tracking-wide pt-0.5">
                  card number
                </span>
                <input
                  type="text"
                  className="w-full rounded-t-md outline-none  
                  bg-transparent px-1.5 pb-1.5"
                  placeholder="0000 0000 0000 0000"
                  value={card}
                  onChange={(e) => setCard(e.currentTarget.value)}
                />
              </div>
              <div className=" flex w-full border-t border-[#837c7c]">
                <input
                  type="text"
                  className="w-[50%] outline-none rounded-b-r-md
                   border-r border-[#837c7c] bg-transparent p-1.5"
                  placeholder="MM/YY"
                  value={date}
                  onChange={(e) => setDate(e.currentTarget.value)}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-[50%] rounded-b-l-md outline-none
                  bg-transparent p-1.5"
                  value={cvv}
                  onChange={(e) => setCvv(e.currentTarget.value)}
                />
              </div>
            </section>
            <p className="text-[14.3px] tracking-wider mt-3">Billing Address</p>
            <section className=" border bg-[#4D4B4B] rounded-md border-[#837c7c] overflow-hidden mt-2 ">
              <div className="flex flex-col">
                <span className="text-sm px-1.5 tracking-wide pt-0.5">
                  city
                </span>
                <select
                  className=" bg-[#4D4B4B] px-2 appearance-none outline-none"
                  onChange={(e) => setCity(e.currentTarget.value)}
                  value={city}
                >
                  <option disabled value="">
                    --Selec--
                  </option>
                  <option value="delhi">Delhi</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="goa">Goa</option>
                  <option value="chandigarh">Chandigarh</option>
                  <option value="punjab">Punjab</option>
                  <option value="haryana">Haryana</option>
                </select>
              </div>
              <div className=" flex w-full border-t border-[#837c7c]">
                <input
                  type="text"
                  placeholder="ZIP"
                  className=" rounded-b-l-md outline-none
                   bg-transparent p-1.5"
                  value={zip}
                  onChange={(e) => setZip(e.currentTarget.value)}
                />
              </div>
            </section>
          </div>
        </div>
        {city &&
        zip.match(cord) &&
        card.match(cardNoPattern) &&
        date.match(datePattern) ? (
          <Link
            to={`/ticket/${Name}/${malls}/${showTime}/${selectedCeats}/${price}`}
          >
            <button
              className=" bg-[#FAD73A] w-full py-2
          font-semibold my-4 rounded-md"
              onClick={() => procidePayment()}
            >
              Pay ₹{price}
            </button>
          </Link>
        ) : (
          <button
            className=" bg-[#FAD73A] w-full py-2
          font-semibold my-4 rounded-md"
            onClick={() => procidePayment()}
          >
            Pay ₹{price}
          </button>
        )}
      </div>
      {/* 
      Error Notification
       */}
      <div
        className={`bg-red-500 fixed rounded-md
         px-2 py-1 top-10 left-[50%] translate-x-[-50%]
         duration-700 ease-in-out text-center text-sm
        ${error ? "translate-y-[0]" : "translate-y-[-100px]"} `}
      >
        {error}
      </div>
    </section>
  );
}

export default Screen;
