import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_context";

const Profile = () => {
  const [search, setSearch] = useState("");
  const { user, userFoodItem } = useContext(AppContext);
  console.log("This is form profile page", userFoodItem);

  // Reverse the recipe array to show the latest item first
  const reversedRecipe = [...userFoodItem].reverse();
  return (
    <div className="  mt-9">
      <div className=" flex items-center justify-center">
        <div>
          <p className=" text-xl ">
            <span className=" font-semibold text-pink-600">Name: </span>
            {user?.name}
          </p>
          <p className=" text-xl ">
            <span className=" font-semibold text-pink-600">Gmail: </span>
            {user?.gmail}
          </p>
        </div>
      </div>

      <div className=" py-3 px-5 w-full">
        <div className=" flex items-center justify-center">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here"
            className=" w-3/4 md:w-1/3 px-3 py-1 rounded-md outline-0 border-solid border-[1px] border-shadow-md"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-4">
          <p className=" text-center mt-3 text-[23px] font-semibold">
            My All Food Post
          </p>
          {reversedRecipe
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => (
              <div
                key={item?._id}
                className="  flex items-center justify-center"
              >
                <div className="  border-solid border-[1px] border-slate-400 shadow-black shadow-md p-2 w-full md:w-1/4 rounded-md">
                  <p className=" text-center text-2xl font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-center">
                    <div className=" mt-2  rounded-md  w-fit">
                      <img
                        src={item.imageurl}
                        alt="photo"
                        className=" w-80 md:w-96  h-72 md:h-60 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold py-2 px-2">
                      <span className=" text-pink-600">Price:</span>{" "}
                      {item?.price}$
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
