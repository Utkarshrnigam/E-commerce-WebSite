import { React, useState, useEffect } from "react";
import AdminSideNav from "../../../components/nav/adminSideNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  getCategories,
  deleteCategory,
  createCategory,
} from "../../../functions/category";
const CategoryManage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    fethAllCategory();
    setLoading(false);
  }, []);
  console.log(categories.length);
  const fethAllCategory = async () => {
    setCategories(await (await getCategories()).data);
  };

  const createCategoryHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory(name, user.idtoken)
      .then((res) => {
        toast.success(`${name} was ceated succesfully`);
        fethAllCategory();
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
      deleteCategory(data.slug, user.idtoken)
        .then((res) => {
          toast.success(`${data.name} deleted succesfully`);
          fethAllCategory();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
        });
    }
  };
  const form = (
    <form onSubmit={createCategoryHandler}>
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

  let loader = null;
  if (loading) loader = <Spin />;
  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          <AdminSideNav />
        </div>
        <div className="col-md-6">
          <h1>Create Category</h1>
          {form}

          <hr />
          {search}
          <br></br>
          {categories.filter(searchFilter(searchQuery)).map((data) => {
            return (
              <div className="alert alert-secondary" key={data._id}>
                {data.name}
                <span
                  onClick={() => deleteHandler(data)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/update-category/${data.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div>{loader}</div>
    </div>
  );
};

export default CategoryManage;
