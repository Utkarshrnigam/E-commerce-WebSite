import axios from "axios";

export const addUpdateUser = async (idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "addOrUpdateUser",
    {},
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};
export const getCurrrentUser = async (idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "getCurrrentUser",
    {},
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};

export const getCurrrentAdmin = async (idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "adminCheck",
    {},
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};
