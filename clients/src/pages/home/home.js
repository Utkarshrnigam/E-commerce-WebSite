import { React, useEffect, useState } from "react";
import Header from "./header";
import NewArival from "./newArival";
import BestSeller from "./bestSeller";
import { getNProducts, getTotalProducts } from "../../functions/product";
const Home = () => {
  const [newArivalProds, setNewArivalProds] = useState([]);
  const [bestSellerProds, setBestSellerProds] = useState([]);
  const [loadingNewArival, setLoadingNewArival] = useState(false);
  const [loadingBestSeller, setLoadingBestSeller] = useState(false);
  const [totalProds, setTotalProds] = useState(0);
  const [newArivalPage, setNewArivalPage] = useState(1);
  const [bestSellerPage, setBestSellerPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}getTotalProducts/`)
      .then((response) => response.json())
      .then((data) => {
        setTotalProds(data);
      });
  }, []);

  useEffect(() => {
    setLoadingNewArival(true);
    fetchNProducts("createdAt", "desc", newArivalPage, 3)
      .then((res) => {
        setNewArivalProds(res.data);
        setLoadingNewArival(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingNewArival(false);
      });
  }, [newArivalPage]);

  useEffect(() => {
    setLoadingBestSeller(true);
    fetchNProducts("sold", "desc", bestSellerPage, 3)
      .then((res) => {
        setBestSellerProds(res.data);
        setLoadingBestSeller(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingBestSeller(false);
      });
  }, [bestSellerPage]);
  const fetchNProducts = async (sortBy, order, page, perpage) => {
    return await getNProducts(sortBy, order, page, perpage);
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <NewArival
        newArivalProds={newArivalProds}
        loadingNewArival={loadingNewArival}
        setNewArivalPage={setNewArivalPage}
        newArivalPage={newArivalPage}
        totalProds={totalProds}
        count={3}
      />
      <BestSeller
        bestSellerProds={bestSellerProds}
        loadingBestSeller={loadingBestSeller}
        setBestSellerPage={setBestSellerPage}
        bestSellerPage={bestSellerPage}
        totalProds={totalProds}
        count={3}
      />
    </>
  );
};

export default Home;
