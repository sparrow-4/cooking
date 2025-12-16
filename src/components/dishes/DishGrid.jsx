import React from "react";
import DishCard from "./DishCard";
import { DISHDATA } from "../../constants/assets";

const DishGrid = ({ showCart, isMobile, isTablet, addToCart, cart }) => {
  return (
    <div
      className={`
        mt-6
        grid
        justify-items-center

        /* MOBILE */
        grid-cols-2
        gap-x-2
        gap-y-6

        /* TABLET */
        ${isTablet && showCart ? "md:grid-cols-2" : "md:grid-cols-3"}
        md:gap-x-8
        md:gap-y-10

        /* DESKTOP */
        ${showCart ? "xl:grid-cols-3" : "xl:grid-cols-5"}
        xl:gap-x-3
        xl:gap-y-12
      `}
    >
      {DISHDATA.map((dish) => (
        <DishCard
          key={dish.id}
          name={dish.name}
          img={dish.img}
          oldPrice={dish.oldPrice}
          newPrice={dish.newPrice}
          stock={dish.stock}
          onAddToCart={addToCart}
          cart={cart} 
        />
      ))}
    </div>
  );
};

export default DishGrid;
