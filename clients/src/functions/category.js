import axios from "axios";

export const getCategories = async () => {
  return await axios.get(process.env.REACT_APP_API + "getCategories");
};

export const getCategory = async (slug) => {
  return await axios.get(process.env.REACT_APP_API + "getCategory/" + slug);
};

export const deleteCategory = async (slug, idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "deleteCategory/" + slug,
    {},
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};

export const createCategory = async (name, idtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "createCategory/",
    { name },
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};

export const updateCategory = async (name, idtoken, slug) => {
  return await axios.post(
    process.env.REACT_APP_API + "updateCategory/" + slug,
    { name },
    {
      headers: {
        idtoken: idtoken,
      },
    }
  );
};
