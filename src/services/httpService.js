import axois from "axios";

axois.interceptors.response.use(null, error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
       console.log("error");
       
    }
    return Promise.reject(error);
  });
  function setJwt(jwt){
    axois.defaults.headers.common['x-auth-token'] = jwt;
  }

  export default {
      get: axois.get,
      post: axois.post,
      put: axois.put,
      delete: axois.delete,
      setJwt

  }