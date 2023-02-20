import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { compareAsc, format } from "date-fns";
import { PVR } from "../data/malls";
function Theator() {
  const { Name } = useParams();
  const navigation = useNavigate();
  const [malls, setMalls] = useState([]);
  const [newDate, setNewdate] = useState([]);
  useEffect(() => {
    const NewDate = localStorage.getItem("date");
    setNewdate(NewDate);
  }, []);
  format(new Date(2014, 1, 11), "yyyy-MM-dd");
  const dates = [
    new Date(2023, 1, 21),
    new Date(2023, 1, 22),
    new Date(2023, 1, 23),
    new Date(2023, 1, 24),
    new Date(2023, 1, 25),
    new Date(2023, 1, 26),
  ];

  return (
    <>
      <section className=" bg-[#06060D] h-screen">
        <header
          className=" flex items-center justify-between
         px-2 pt-3 pb-2.5 text-white "
        >
          <div className=" flex items-center">
            <button
              onClick={() =>
                setTimeout(() => {
                  navigation(-1);
                }, 200)
              }
              className=" text-lg font-bold cursor-pointer mr-2 "
            >
              <ArrowBackRoundedIcon />
            </button>
            <p className=" max-[340px]:text-sm">{Name}</p>
          </div>
          <div className=" flex gap-1">
            <SearchRoundedIcon className=" cursor-pointer" />
            <FilterListRoundedIcon className=" cursor-pointer" />
            <ShareRoundedIcon className=" cursor-pointer" />
          </div>
        </header>
        <div className=" text-white flex items-center gap-1 ml-4">
          <span className=" text-[#FAD73A] ">
            <GppGoodOutlinedIcon />
          </span>
          <span className="text-[12.4px] tracking-wide">
            Your Safety is our Priority
          </span>
        </div>
        <ul
          className="flex gap-1 text-center leading-none
         w-full justify-center mt-3.5"
        >
          {dates.sort(compareAsc).map((date, index) => {
            return (
              <li
                className={` border-[#292D2E] bg-[#292D2E]
                 border-2 px-0.5 py-[.150rem] text-xs cursor-pointer 
                 rounded-lg  w-10 tracking-wider ${
                   newDate === `${date}`
                     ? "bg-white text-[#292D2E] font-semibold"
                     : "bg-[#292D2E] text-white"
                 }`}
                key={index}
                onClick={() => {
                  localStorage.setItem("date", date);
                  setNewdate(`${date}`);
                }}
              >
                {format(date, "dd MMM")}
              </li>
            );
          })}
        </ul>
        <div className=" text-white flex flex-col gap-2 mt-5 px-4">
          {PVR.map((screen) => {
            return (
              <div key={screen.id}>
                <p
                  className="cursor-pointer"
                  onClick={() => setMalls(screen.name)}
                >
                  {screen.name}
                </p>
                <ul className=" grid grid-cols-3 flex-wrap gap-3 mt-2 items-center">
                  {malls.includes(screen.name)
                    ? screen.showtimes.map((showTime, index) => {
                        if (!!newDate) {
                          return (
                            <Link
                              key={index}
                              to={`/screen/${showTime}/${malls}/${Name}`}
                            >
                              <li
                                className=" border-2 border-[#C2F640] px-1.5 text-sm 
                              text-center py-1 text-[#C2F640] font-semibold rounded-lg"
                              >
                                {showTime}
                              </li>
                            </Link>
                          );
                        } else {
                          return (
                            <li
                              key={index}
                              className=" border-2 border-[#C2F640] px-1.5 text-sm 
                              text-center py-1 text-[#C2F640] font-semibold rounded-lg"
                              onClick={() => alert("Date is Missing")}
                            >
                              {showTime}
                            </li>
                          );
                        }
                      })
                    : ""}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default Theator;
