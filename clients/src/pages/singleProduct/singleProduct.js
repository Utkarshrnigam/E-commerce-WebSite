import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProduct } from "../../functions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductListItems from "./productListItems";
import { Link } from "react-router-dom";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import RatingModel from "../../components/modal/ratingModal";
import {
  updateAddRating,
  userProductRating,
  getRelatedProduct,
} from "../../functions/product";
const { TabPane } = Tabs;
const SingleProduct = ({ match }) => {
  const [product, setProduct] = useState({});
  const [relatedProd, setRelatedProd] = useState({});

  const [star, setStar] = useState(0);
  const [avgStar, setAvgStar] = useState(0);
  const slug = match.params.slug;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (!product || !product.category) return;

    getRelatedProduct()
      .then((res) => {
        console.log(res);
        setRelatedProd(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(relatedProd);
  const fetchProduct = async () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user || !product || !product._id) return;
    console.log(product);
    userProductRating(user.idtoken, product._id).then((res) => {
      setStar(res.data);
    });
  }, [product, user]);

  useEffect(() => {
    findAvgRating();
  }, [product]);

  const changeRatingHandler = (stars) => {
    console.log(stars);
    updateAddRating(product._id, user.idtoken, stars)
      .then((res) => {
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const findAvgRating = () => {
    if (!product || !product.ratings || product.ratings.length == 0) return;
    let avgRating = 0;
    product.ratings.forEach((ele) => {
      avgRating += ele.star;
    });
    avgRating = avgRating / product.ratings.length;
    setAvgStar(avgRating);
  };
  const { images } = product;
  return (
    <div>
      <hr className="mt-3"></hr>
      <div className="row">
        <div className="col-md-6">
          <Carousel autoPlay infiniteLoop showArrows>
            {images &&
              product.images.map((img) => (
                <img key={img.public_id} src={img.url}></img>
              ))}
          </Carousel>
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {product.description && product.description}
            </TabPane>
            <TabPane tab="More" key="2">
              Call use on xxxx xxx xxx to learn more about this product.
            </TabPane>
          </Tabs>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <h1 className="bg-info p-3 text-center">{product.title}</h1>
          <StarRatings
            rating={avgStar}
            starRatedColor="red"
            isSelectable={false}
            numberOfStars={5}
            name={product._id}
            starDimension="20px"
            starSpacing="2px"
          />
          {product && product.ratings
            ? `(${product.ratings.length})`
            : "No rating yet"}
          <Card
            actions={[
              <>
                <ShoppingCartOutlined className="text-success" /> <br />
                Add to Cart
              </>,
              <Link to="/">
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </Link>,
              <RatingModel>
                <StarRatings
                  rating={star}
                  starRatedColor="red"
                  changeRating={changeRatingHandler}
                  numberOfStars={5}
                  name={product._id}
                />
              </RatingModel>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
