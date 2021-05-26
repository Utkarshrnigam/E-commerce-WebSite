import { React, useState, useEffect } from "react";
import AdminSideNav from "../../../components/nav/adminSideNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { updateCategory, getCategory } from "../../../functions/category";
const UpdateCategory = ({ history, match, props }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getCategory(match.params.slug)
      .then((res) => {
        setName(res.data[0].name);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  }, []);

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(name, user.idtoken, match.params.slug)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.name} was succesfully updated`);
        setLoading(false);
        setName("");
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const form = (
    <form onSubmit={updateCategoryHandler}>
      <div className="form-group">
        <input
          className="form-control"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br></br>
        <button
          disabled={!(name.length > 1)}
          className="btn btn-outline-primary"
        >
          Update
        </button>
      </div>
    </form>
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
          <h1>Update Category</h1>
          {form}
        </div>
      </div>
      <div>{loader}</div>
    </div>
  );
};

export default UpdateCategory;
