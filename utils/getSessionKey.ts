const getSessionKey = () => {
  return sessionStorage.getItem("accesss_key");
};

export default getSessionKey;
