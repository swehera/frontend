import { bouncy } from "ldrs";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/App_context";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { recipe, saveFoodById, checkdata } = useContext(AppContext);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Reverse the recipe array to show the latest item first
  const reversedRecipe = [...recipe].reverse();
  const fetchingDataCheck = checkdata.status;

  useEffect(() => {
    bouncy.register();
    // Simulate loading time
    setTimeout(() => {
      setLoading(false); // Set loading to false after some time
    }, 2000); // Adjust this time according to your actual fetching time
  }, []); // Empty dependency array to run this effect only once

  // const checkDataFetching = () => {
  //   if(checkdata?.status = 200) {

  //   }
  // }

  const saved = async (id) => {
    const result = await saveFoodById(id);
    toast.success(result.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  console.log("this is reversed recipe", reversedRecipe);
  console.log("this is for check status", checkdata);

  return (
    <div className="py-3 px-5 w-full">
      <ToastContainer />
      <div className="flex items-center justify-center">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here"
          className="w-3/4 md:w-1/3 px-3 py-1 rounded-md outline-0 border-solid border-[1px] border-shadow-md"
        />
      </div>

      {loading && fetchingDataCheck === 200 ? ( // Conditionally render loading message
        <div className=" flex items-center justify-center mt-16">
          <l-bouncy size="45" speed="1.75" color="#FF012D"></l-bouncy>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {reversedRecipe
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => (
              <div key={item?._id} className="flex items-center justify-center">
                <div className="border-solid border-[1px] border-slate-400 shadow-md shadow-black p-2 w-full rounded-md">
                  <p className=" py-1 px-2 font-semibold flex items-center justify-start gap-2">
                    <CgProfile className=" text-xl text-pink-600 font-semibold" />
                    Posted by {item.user.name}
                  </p>{" "}
                  {/* Display the user's name */}
                  <div className="flex items-center justify-center">
                    <div className="mt-2 p-2  w-fit">
                      <img
                        src={item.imageurl}
                        alt="photo"
                        className=" w-80 md:w-96  h-72 md:h-60 rounded-md"
                      />
                    </div>
                  </div>
                  <p className=" text-left py-2 px-3 text-2xl font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between mt-1 mb-2 ml-2">
                    <button
                      onClick={() => navigate(`/${item._id}`)}
                      className="py-1 px-3 rounded-md bg-slate-900 text-white"
                    >
                      View more
                    </button>
                    <button onClick={() => saved(item._id)}>
                      <FaBookmark className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
