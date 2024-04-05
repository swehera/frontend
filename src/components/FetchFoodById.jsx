import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App_context";
import { useLocation, useNavigate } from "react-router-dom";

const FetchFoodById = ({ id }) => {
  const location = useLocation();
  const { getRecipeById } = useContext(AppContext);
  const [food, setFood] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async (id) => {
      const result = await getRecipeById(id);
      console.log("food by id", result);
      setFood(result.data.recipe);
    };
    fetchFood(id);
  }, [id]);

  console.log("This is from fetchFoosById", food);

  return (
    <div className=" w-full   flex items-center justify-center mt-5">
      {food ? (
        <div className="  p-5">
          <div className="  border-solid border-[1px] border-slate-300 shadow-black shadow-md p-3 rounded-md">
            <p className="text-center text-2xl font-semibold text-gray-800 p-1">
              {food.title}
            </p>
            <img
              src={food.imageurl}
              alt="image"
              className="w-80 md:w-80  h-72 md:h-80 rounded-md"
            />
            <p className="text-xl font-bold pt-2">
              <span className=" text-pink-600 text-xl font-bold ">Price: </span>
              {food.price}$
            </p>
            {location.pathname !== "/saved" && (
              <>
                <p>
                  <span className=" text-gray-900 font-bold">
                    Description:{" "}
                  </span>
                  {food.description}
                </p>
              </>
            )}
          </div>
          {location.pathname !== "/saved" && (
            <div className=" flex items-center justify-center mt-3">
              <button
                onClick={() => navigate("/")}
                className=" bg-slate-800 text-white py-1 px-3 rounded-md"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className=" text-xl font-semibold">Loading..</p>
      )}
    </div>
  );
};

export default FetchFoodById;
