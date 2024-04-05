import axios from "axios";
import { AppContext } from "./App_context";
import { useEffect, useState } from "react";
const App_State = (props) => {
  const [token, setToken] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [savedFood, setSavedFood] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userFoodItem, setUserFoodItem] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [reload, setreload] = useState(true);

  //common url
  // const url = "http://localhost:3000/api";
  const url = "https://foodstore-api-6odl.onrender.com/api";

  useEffect(() => {
    // login("1@gmail.com", "her7762");
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api);
      console.log(api.data.recipe);
      setRecipe(api.data.recipe);
    };

    //getSaveFoodById();
    getSaveFoodById();
    fetchRecipe();
    profile();
    foodByUserId(userId);
  }, [token, userId, reload]);

  //this useEffect for save the token in browser local storage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token is: ", token);
    }
    const tokenFromLocalStorage = localStorage.getItem("token is: ", token);
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
      setisAuthenticated(true);
    }
  }, [token, reload]);

  //register function
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      {
        name,
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    // setToken(api.data.token);
    return api;
    // console.log("login data", api);
  };

  //login
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    console.log("login data", api.data.token);
    setisAuthenticated(true);

    return api;
  };

  //add food items function
  const addFood = async (title, price, description, imageurl) => {
    const api = await axios.post(
      `${url}/add`,
      {
        title,
        price,
        description,
        imageurl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    return api;
  };

  //find food by id
  const getRecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(api);
    return api;
  };

  // save Food by id
  const saveFoodById = async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("save Food by id", api);
    setreload(!reload);
    return api;
  };

  // get saved food items
  // const getSaveFoodById = async () => {
  //   const api = await axios.get(`${url}/saved`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     withCredentials: true,
  //   });
  //   console.log("get all saved food only", api);
  //   console.log("get all saved food", api.data.recipe);
  //   setSavedFood(api.data.recipe);
  //   // return api;
  // };

  //get saved recipe
  const getSaveFoodById = async () => {
    const api = await axios.get(
      `${url}/saved`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("save Food by id", api);
    console.log("save Food by id details", api.data.recipe);
    setSavedFood(api.data.recipe);
    // return api;
  };

  //user profile function
  const profile = async () => {
    const api = await axios.get(
      `${url}/user`,

      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("find the data", api);
    console.log("This is user profile Data", api.data.user);
    setUserId(api.data.user._id);
    setUser(api.data.user);
  };

  //get food item by user id
  const foodByUserId = async (id) => {
    const api = await axios.get(
      `${url}/user/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("user specific food item: ", api);
    setUserFoodItem(api.data.recipe);
  };

  //user logout function
  const logOut = () => {
    // Remove token from local storage
    localStorage.removeItem("token is: ");
    setToken("");
    setisAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        addFood,
        recipe,
        getRecipeById,
        saveFoodById,
        savedFood,
        userFoodItem,
        user,
        logOut,
        isAuthenticated,
        setisAuthenticated,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;
