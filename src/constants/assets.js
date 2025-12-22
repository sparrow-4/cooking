import food1 from "../assets/svg/food1.svg";
import food2 from "../assets/svg/food2.svg";
import food3 from "../assets/svg/food3.svg";
import food4 from "../assets/svg/food4.svg";
import logo from "../assets/svg/main.svg";
import bikeImg from "../assets/images/bike.png";
import smokeImg from "../assets/images/smoke.png";

// SVG ICONS AS REACT COMPONENTS (VITE CORRECT)
import HomeIcon from "../assets/svg/icons/homeicon.svg?react";
import BellIcon from "../assets/svg/icons/bell.svg?react";
import FavoriteIcon from "../assets/svg/icons/fvrt.svg?react";
import MessageIcon from "../assets/svg/icons/mesg.svg?react";
import SettingsIcon from "../assets/svg/icons/dsct.svg?react";

export const assets = {
  food1,
  food2,
  food3,
  food4,
  logo,
  bikeImg,
  smokeImg,

  icons: {
    home: HomeIcon,
    bell: BellIcon,
    favorites: FavoriteIcon,
    messages: MessageIcon,
    settings: SettingsIcon,
  },
};

export const DISHDATA = [
  {
    id: 1,
    name: "Healthy noodle with spinach leaf",
    image: food1,
    currency: "AED",
    stock: 22,
    sizes: ["S", "M", "L"],
    category: "TODAY",
    pricing: {
      S: { price: 2.63, oldPrice: 3.02 },
      M: { price: 3.29, oldPrice: 3.78 },
      L: { price: 4.28, oldPrice: 4.91 },
    },
  },
  {
    id: 2,
    name: "Hot spicy fried rice with omelet",
    image: food2,
    currency: "AED",
    stock: 13,
    sizes: ["S", "M", "L"],
    category: "TODAY",
    pricing: {
      S: { price: 2.63, oldPrice: 3.02 },
      M: { price: 3.29, oldPrice: 3.78 },
      L: { price: 4.28, oldPrice: 4.91 },
    },
  },
  {
    id: 3,
    name: "Spicy instant noodle with omelette",
    image: food3,
    currency: "AED",
    stock: 17,
    sizes: ["S", "M", "L"],
    category: "TODAY",
    pricing: {
      S: { price: 11.43, oldPrice: 13.88 },
      M: { price: 14.29, oldPrice: 17.35 },
      L: { price: 18.58, oldPrice: 22.56 },
    },
  },
  {
    id: 4,
    name: "Mixed vegetable ramen soup",
    image: food4,
    currency: "AED",
    stock: 18,
    sizes: ["S", "M", "L"],
    category: "SPECIAL",
    pricing: {
      S: { price: 5.03, oldPrice: 6.63 },
      M: { price: 6.29, oldPrice: 8.29 },
      L: { price: 8.18, oldPrice: 10.78 },
    },
  },
  {
    id: 6,
    name: "Ginger noodle with spinach leaf",
    image: food1,
    currency: "AED",
    stock: 27,
    sizes: ["S", "M", "L"],
    category: "SOUTH_INDIAN",
    pricing: {
      S: { price: 8.23, oldPrice: 10.63 },
      M: { price: 10.29, oldPrice: 13.29 },
      L: { price: 13.38, oldPrice: 17.28 },
    },
  },
  {
    id: 7,
    name: "Chilly noodle with spinach leaf",
    image: food2,
    currency: "AED",
    stock: 20,
    sizes: ["S", "M", "L"],
    category: "SOUTH_INDIAN",
    pricing: {
      S: { price: 10.07, oldPrice: 12.23 },
      M: { price: 12.59, oldPrice: 15.29 },
      L: { price: 16.37, oldPrice: 19.88 },
    },
  },
  {
    id: 10,
    name: "Veg hakka noodles",
    image: food1,
    currency: "AED",
    stock: 24,
    sizes: ["S", "M", "L"],
    category: "TODAY",
    pricing: {
      S: { price: 4.39, oldPrice: 5.59 },
      M: { price: 5.49, oldPrice: 6.99 },
      L: { price: 7.14, oldPrice: 9.09 },
    },
  },
  {
    id: 11,
    name: "Chicken chilli noodles",
    image: food3,
    currency: "AED",
    stock: 14,
    sizes: ["S", "M", "L"],
    category: "SPECIAL",
    pricing: {
      S: { price: 12.79, oldPrice: 14.63 },
      M: { price: 15.99, oldPrice: 18.29 },
      L: { price: 20.79, oldPrice: 23.78 },
    },
  },
];


