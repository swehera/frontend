// import { useContext } from "react";
// import { AppContext } from "../context/App_context";
// import FetchFoodById from "./FetchFoodById";

import { useContext } from "react";
import { AppContext } from "../context/App_context";
import FetchFoodById from "./FetchFoodById";

const Saved = () => {
  const { savedFood } = useContext(AppContext);
  // const { savedFood } = useContext(AppContext);
  console.log("This is from Saved Page", savedFood);
  return (
    <div className=" ">
      <div className="">
        {savedFood?.map((data) => (
          <div key={data.recipe}>
            <FetchFoodById id={data.recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
