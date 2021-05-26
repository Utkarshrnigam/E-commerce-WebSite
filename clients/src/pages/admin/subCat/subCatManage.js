import { React, useState, useEffect } from "react";
import AdminSideNav from "../../../components/nav/adminSideNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
// import Selector from "../../../components/selector/selector";
import { Select } from "antd";
import {
  MailOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { getCategories } from "../../../functions/category";
import {
  getSubCats,
  createSubCat,
  deleteSubCat,
} from "../../../functions/subCat";

const SubCategoryManage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { Option } = Select;

  useEffect(() => {
    setLoading(true);
    fethAllCategory();
    console.log(category);
    console.log(subCats);
    fethAllSubCategory(category);
    setLoading(false);
  }, [category]);

  console.log(categories.length);
  const fethAllCategory = async () => {
    setCategories(await (await getCategories()).data);
  };

  const fethAllSubCategory = async (category) => {
    setSubCats(await (await getSubCats(category)).data);
  };

  const createSubCatHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    createSubCat(name, user.idtoken, category)
      .then((res) => {
        toast.success(`${name} was ceated succesfully`);
        fethAllCategory();
        fethAllSubCategory(category);
        setLoading(false);
        setName("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const deleteHandler = (data) => {
    if (window.confirm("Are You Sure You Want To Delete" + data.name)) {
      setLoading(true);
      deleteSubCat(data.slug, user.idtoken)
        .then((res) => {
          toast.success(`${data.name} deleted succesfully`);
          fethAllCategory();
          fethAllSubCategory(category);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };

  const form = (
    <form onSubmit={createSubCatHandler}>
      <div className="form-group">
        <input
          className="form-control"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <button disabled={!name.length > 1} className="btn btn-outline-primary">
          Create
        </button>
      </div>
    </form>
  );

  const searchQueryHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  const searchFilter = (searchQuery) => (data) =>
    data.name.toLowerCase().includes(searchQuery);

  let search = (
    <input
      className="form-control"
      value={searchQuery}
      onChange={searchQueryHandler}
      placeholder="Search..."
    ></input>
  );
  console.log(category);
  let loader = null;
  if (loading) loader = <Spin />;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div>
            <AdminSideNav />
          </div>
          <div className="col-md-6">
            <h1>Select Parent Category</h1>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => {
                setCategory(e);
              }}
            >
              {categories.map((ele) => {
                return (
                  <Option key={ele._id} value={ele._id}>
                    {ele.name}
                  </Option>
                );
              })}
            </Select>
            <h1>Create Sub Category</h1>
            {form}
            <hr />
            {search}
            <br></br>
            {subCats.filter(searchFilter(searchQuery)).map((data) => {
              return (
                <div className="alert alert-secondary" key={data._id}>
                  {data.name}
                  <span
                    onClick={() => deleteHandler(data)}
                    className="btn btn-sm float-right"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>{loader}</div>
      </div>
    </>
  );
};

export default SubCategoryManage;
