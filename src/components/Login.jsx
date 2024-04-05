import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { AppContext } from "../context/App_context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const result = await login(gmail, password);
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
    if (result.data.message !== "No user exits") {
      setTimeout(() => {
        navigate("/");
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
            Login
          </p>
        </div>
        <p>Email: </p>
        <input
          type="text"
          onChange={(e) => setGmail(e.target.value)}
          value={gmail}
          required
          placeholder="Enter the email"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <p>Password: </p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          placeholder="Enter the password"
          className=" px-3 py-1 rounded-md border-solid border-[1px] outline-0 border-gray-700"
        />
        <div className="flex items-center justify-center mt-3">
          <button
            onClick={loginHandler}
            className=" py-1 px-3 rounded-md bg-slate-700 hover:bg-slate-900 duration-300 text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
