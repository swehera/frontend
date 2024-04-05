import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { AppContext } from "../context/App_context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    const result = await register(name, gmail, password);
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

    if (result.data.message !== "User already exists") {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    console.log(result);
    console.log(result.data);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <ToastContainer />
      <div className=" py-3 px-5 border-solid border-2 border-gray-700 rounded-md">
        <div>
          <p className="text-center text-2xl text-gray-700 font-semibold">
            Register
          </p>
        </div>
        <p>Name: </p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          id="exampleInputName1"
          placeholder="Enter the name"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <p>Email: </p>
        <input
          type="text"
          onChange={(e) => setGmail(e.target.value)}
          value={gmail}
          required
          id="exampleInputEmail2"
          placeholder="Enter the email"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <p>Password: </p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          id="exampleInputPassword3"
          placeholder="Enter the password"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <div className="flex items-center justify-center mt-3">
          <button
            onClick={registerHandler}
            className=" py-1 px-3 rounded-md bg-slate-700 hover:bg-slate-900 duration-300 text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
