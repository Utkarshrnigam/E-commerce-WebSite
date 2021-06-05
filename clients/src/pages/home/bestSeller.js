import React from "react";
import { Card, Skeleton, Pagination } from "antd";
import noimage from "../../images/product/noimage.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
const BestSeller = ({
  bestSellerProds,
  loadingBestSeller,
  count,
  setBestSellerPage,
  bestSellerPage,
  totalProds,
}) => {
  const { Meta } = Card;
  const findAvgRating = (product) => {
    if (!product || !product.ratings || product.ratings.length == 0) return;
    let avgRating = 0;
    product.ratings.forEach((ele) => {
      avgRating += ele.star;
    });
    return avgRating / product.ratings.length;
  };
  let body = null;
  let cards = [];
  if (loadingBestSeller) {
    for (let i = 0; i < count; i++) {
      cards.push(
        <div className="col-md-4" key={i}>
          <div className="text-center p-2">
            <StarRatings
              rating={0}
              starRatedColor="red"
              isSelectable={false}
              numberOfStars={5}
              name={1}
              starDimension="20px"
              starSpacing="2px"
            />
          </div>
          <Card style={{ width: 280, height: 387 }}>
            <Skeleton></Skeleton>
          </Card>
        </div>
      );
    }
  } else {
    cards = bestSellerProds.map((prod) => {
      return (
        <div className="col-md-4" key={prod._id}>
          <div className="text-center p-2">
            <StarRatings
              rating={findAvgRating(prod)}
              starRatedColor="red"
              isSelectable={false}
              numberOfStars={5}
              name={prod._id}
              starDimension="20px"
              starSpacing="2px"
            />
            {prod && prod.ratings
              ? `(${prod.ratings.length})`
              : "No rating yet"}
          </div>
          <Card
            style={{ width: 280 }}
            cover={
              <img
                alt="example"
                height={200}
                width={140}
                src={prod.images.length > 0 ? prod.images[0].url : noimage}
              />
            }
            actions={[
              <Link to={`/product/${prod.slug}`}>
                <EyeOutlined key="eye" />
                <br />
                View Product
              </Link>,
              <>
                <ShoppingCartOutlined key="cart" />
                <br />
                Add to Cart
              </>,
            ]}
          >
            <Meta
              title={prod.title}
              description={prod.description.slice(0, 60) + "..."}
            />
          </Card>
        </div>
      );
    });
  }

  return (
    <>
      <div
        className="jumbotron h1 text-danger text-center"
        // style={{ marginTop: "-25px" }}
      >
        Best Seller
      </div>
      <div className=" container">
        <div className="row">{cards.map((ele) => ele)}</div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-5 rext-center pt-2 p-3">
          <Pagination
            className="col-md-4"
            current={bestSellerPage}
            onChange={(val) => setBestSellerPage(val)}
            total={(totalProds / 3) * 10}
          />
        </div>
      </div>
    </>
  );
};
export default BestSeller;
