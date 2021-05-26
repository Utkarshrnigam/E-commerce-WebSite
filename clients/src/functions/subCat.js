import axios from "axios";

export const getSubCats = async (parent) => {
  return await axios.post(process.env.REACT_APP_API + "getSubCats", {
    parent,
  });
};

export const getSubCat = async (slug) => {
  return await axios.get(process.env.REACT_APP_API + "getCat/" + slug);
};

export const deleteSubCat = async (slug, idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "deleteSubCat/" + slug,
    {},
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};

export const createSubCat = async (name, idtoken, parent) => {
  return await axios.post(
    process.env.REACT_APP_API + "createSubCat/",
    { name, parent },
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};

export const updateSubCat = async (name, idtoken, slug) => {
  return await axios.post(
    process.env.REACT_APP_API + "updateSubCat/" + slug,
    { name },
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};
