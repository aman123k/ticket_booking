import React from "react";
import { Movies } from "../data/movies";
import { types } from "../data/type";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <section className="bg-[#06060D] scroll-smooth">
        <div className=" relative ">
          <img
            className=" w-full"
            src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/09/black-adam-1663735185.jpg"
            alt="movie"
          />
          <div
            className="absolute bg-[#06060D] w-full 
        bottom-[-10px] opacity-60
         left-0 h-4"
          ></div>
          <div className=" absolute w-[94%] bottom-0 left-4">
            <span className="  bg-[#292D2E] items-center px-3 py-2.5 rounded-2xl">
              🎬
              <span className=" ml-1 mb-3 text-white text-[13px]">Action</span>
            </span>
            <div className=" text-white mt-4 flex justify-between items-end ">
              <div className=" mb-3">
                <h1 className=" text-3xl">Black Adam</h1>
                <p className=" text-sm ml-5">Relesing in 1 day</p>
              </div>
              <Link to="/theator/Black Adam">
                <span
                  className=" bg-[#FAD73A] text-base px-3.5
             rounded-2xl text-[#070B0E] font-semibold py-2 mb-[-1rem] mr-3
             cursor-pointer "
                >
                  Book
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex gap-3 justify-center text-white mt-6 ">
          {types.map((type) => {
            return (
              <span
                className="py-1 px-2 rounded-lg max-[340px]:tracking-normal
                max-[340px]:p-1.5 max-[340px]:text-xs
                border-[1px] tracking-wider cursor-pointer
                 font-mono text-sm font-normal"
                key={type.id}
              >
                {type.name}
              </span>
            );
          })}
        </div>
        <div
          className=" grid grid-cols-2 justify-center
        gap-x-3 px-3 pt-4 text-white"
        >
          {Movies.map((movie) => {
            return (
              <div key={movie.id} className="pb-5">
                <img
                  className="rounded-lg mb-2 "
                  src={movie.image}
                  alt={movie.name}
                />
                <h1 className="text-[15px]">{movie.name}</h1>
                <p className="text-[13px]">U/A - {movie.language}</p>
                <p className="text-xs">{movie.genre}</p>
                <Link to={movie.link}>
                  <button
                    className=" bg-[#FAD73A] text-base px-3
             rounded-lg text-[#070B0E] font-semibold py-1.5 
             cursor-pointer mt-2"
                  >
                    Book
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Header;
