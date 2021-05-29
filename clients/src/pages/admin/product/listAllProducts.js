import { React, useState, useEffect } from "react";
import AdminSideNav from "../../../components/nav/adminSideNav";
import { getAllProducts, deleteProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import noimage from "../../../images/product/noimage.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Meta } = Card;
const ListAllProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchAllProducts(100);
  }, []);

  const fetchAllProducts = (cnt) => {
    fetch(`${process.env.REACT_APP_API}products/${100}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };

  const productDeleteHandler = (prod) => {
    if (!window.confirm("Are You Sure You Want To Delete" + prod.title)) return;
    deleteProduct(prod.slug, user.idtoken)
      .then((res) => {
        fetchAllProducts(100);
        toast.success(`${res.data.title} was deleted succesfully`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          <AdminSideNav />
        </div>
        <div className="col">
          <h1>Products</h1>
          <div className="row">
            {products.map((prod) => {
              return (
                <div className="col-md-3 mb-3 ml-2" key={prod._id}>
                  <Card
                    style={{ width: 280 }}
                    cover={
                      <img
                        alt="example"
                        height={200}
                        width={140}
                        src={
                          prod.images.length > 0 ? prod.images[0].url : noimage
                        }
                      />
                    }
                    actions={[
                      <EditOutlined key="edit" />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => productDeleteHandler(prod)}
                      />,
                    ]}
                  >
                    <Meta title={prod.title} description={prod.description} />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAllProducts;
