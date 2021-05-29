import axios from "axios";

export const createProduct = async (product, idtoken, creator) =>
  await axios.post(
    `${process.env.REACT_APP_API}create-product`,
    { product, creator },
    {
      headers: {
        idtoken,
      },
    }
  );

export const getAllProducts = async (count) => {
  await axios.get(`${process.env.REACT_APP_API}products/${count}`);
};

export const deleteProduct = async (slug, idtoken) =>
  await axios.post(`${process.env.REACT_APP_API}delete-product/${slug}`, {
    headers: {
      idtoken,
    },
  });
