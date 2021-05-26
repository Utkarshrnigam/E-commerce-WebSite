import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/adminSideNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories } from "../../../functions/category";
import { getCurrrentUser } from "../../../functions/auth";
import { getSubCats } from "../../../functions/subCat";
import { Select } from "antd";
const initialState = {
  title: "",
  creator: "",
  description: "",
  price: "",
  category: "",
  subCats: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCatsList, setSubCatsList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [showSubCats, setShowSubCats] = useState(false);
  // destructure
  const {
    title,
    creator,
    description,
    price,
    category,
    subCats,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const { Option } = Select;
  useEffect(() => {
    getCurrrentUser(user.idtoken)
      .then((res) => {
        setValues({ ...values, creator: res.data[0]._id });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fethAllCategory();
  }, []);

  const fethAllCategory = async () => {
    setCategories(await (await getCategories()).data);
  };

  const fethAllSubCategory = async (category) => {
    setSubCatsList(await (await getSubCats(category)).data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.idtoken)
      .then((res) => {
        console.log(res);
        toast.success(res.data.title + " was created succesfullt");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const selectCategoryHandler = (e) => {
    setValues({ ...values, subCats: [], category: e });
    setShowSubCats(true);
    fethAllSubCategory(e);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          <AdminNav />
        </div>
        <div className="col-md-6">
          <h4>Product create</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <strong>Title</strong>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Description</strong>
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Price</strong>
              </label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Shipping</strong>
              </label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <strong>Quantity</strong>
              </label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Color</strong>
              </label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <strong>Brand</strong>
              </label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <strong>Choose category:</strong>
              </label>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(e) => selectCategoryHandler(e)}
              >
                {categories.map((ele) => {
                  return (
                    <Option key={ele._id} value={ele._id}>
                      {ele.name}
                    </Option>
                  );
                })}
              </Select>
            </div>

            {showSubCats && (
              <div className="form-group">
                <label>
                  <strong>Choose Sub category:</strong>
                </label>
                <Select
                  showSearch
                  mode="multiple"
                  allowClear
                  value={subCats}
                  style={{ width: 200 }}
                  placeholder="Select a Sub category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(e) => {
                    setValues({ ...values, subCats: e });
                  }}
                >
                  {subCatsList.map((ele) => {
                    return (
                      <Option key={ele._id} value={ele._id}>
                        {ele.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            )}

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
