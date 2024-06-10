import axios from 'axios'

// import {apiUrl, getCurrentUser} from "@/constant/config";

import {apiUrl, getCurrentUser, setCurrentUser} from "../constant/config";

axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use(function (config) {
    let currentUser = getCurrentUser();
    const token = currentUser !== null ? currentUser.token : null;
    if (token) {
      config.headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };
    }

    return config;
  },
  function (error) {
    //alert(JSON.stringify(error));
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response?.data?.resultados?.usuario) {
      // let user = response.data.resultados.usuario;
      // if (user.alterar_senha === 1 && location.pathname === '/login' ) {
      //  // location.href = "/alterar-senha";
      // }
    }

    return response;
  },
  function (error) {
    console.log(error?.response?.status)
    if (error?.response?.status === 401) {
      setCurrentUser(null);
      if (location.pathname !== '/login') location.href = "/";
    }
    if (error?.response?.status === 403 && location.pathname !== "/login") {
      // location.href = "/unauthorized";
    }

    // if (error?.response?.status === 400 || error?.response?.status === 500) {
    //   if (error?.response.data.message !== undefined && error?.response.data.message.length) {
    //     Vue.$notify("error filled", "Erro!", error?.response.data.message, {duration: 5000});
    //     return error?.response;
    //   }
    // }

    return Promise.reject(error);
  }
);
export default axios
