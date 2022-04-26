import React from "react";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";

export default function Home() {
  const allProducts = useSelector((state) => state.products);
  return (
    <div>
      {/* Necesitamos el hardcode*/}
      {allProducts.length ? (
        allProducts.map((product) => {
          return (
            <div>
              <Cards
                name={product.name}
                id={product.id}
                image={product.image}
                originalprice={product.originalprice}
                promotionprice={product.promotionprice}
                ispromotion={product.ispromotion}
              />
            </div>
          );
        })
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      <Footer />
    </div>
  );
};