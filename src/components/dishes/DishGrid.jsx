import React from "react";
import DishCard from "./DishCard";
import { DISHDATA } from "../../constants/assets";

const DishGrid = ({ showCart, addToCart, cart }) => {
  return (
    <div
      className="
        mt-6
        grid
        gap-x-4 gap-y-8

        /* 🔥 AUTO RESPONSIVE GRID */
        [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]

        /* TABLET TUNING */
        md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]

        /* DESKTOP TUNING */
        xl:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
      "
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
