import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { AppContext } from "../context/App_context";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { addFood } = useContext(AppContext);
  const [formData, setformData] = useState({
    title: "",
    price: "",
    description: "",
    imageurl: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const addFoodHandler = async () => {
    const { title, price, description, imageurl } = formData;
    const result = await addFood(title, price, description, imageurl);
    console.log("addrecipe ", result);

    console.log(result.data);
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
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <ToastContainer />
      <div className=" py-3 px-5 border-solid border-2 border-gray-700 rounded-md">
        <div>
          <p className="text-center text-2xl text-gray-700 font-semibold">
            Add Food
          </p>
        </div>
        <p>Title: </p>
        <input
          type="text"
          value={formData.title}
          onChange={onChangeHandler}
          name="title"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter the title"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <p>Price: </p>
        <input
          type="number"
          value={formData.price}
          onChange={onChangeHandler}
          name="price"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter the price"
          className=" px-3 py-1  rounded-md border-solid focus:ring-2 focus:ring-blue-500 border-[1px] outline-0 border-gray-700"
        />
        <p>Description: </p>
        <textarea
          type="text"
          value={formData.description}
          onChange={onChangeHandler}
          id="exampleInputPassword1"
          name="description"
          placeholder="Enter the description"
          className=" px-3 py-2 w-full h-24 resize-none focus:outline-none rounded-md border-solid border-[1px]  border-gray-700"
        />
        <p>Image: </p>
        <input
          type="text"
          value={formData.imageurl}
          onChange={onChangeHandler}
          name="imageurl"
          id="exampleInputPassword1"
          placeholder="Enter the image uri"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <div className="flex items-center justify-center mt-3">
          <button
            onClick={addFoodHandler}
            className=" py-1 px-3 rounded-md bg-slate-700 hover:bg-slate-900 duration-300 text-white"
          >
            Add Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
