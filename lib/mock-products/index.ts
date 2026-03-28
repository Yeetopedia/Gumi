import { Product } from "@/types";
import { FASHION_PRODUCTS } from "./fashion";
import { SHOES_PRODUCTS } from "./shoes";
import { BAGS_ACCESSORIES_PRODUCTS } from "./bags-accessories";
import { JEWELRY_PRODUCTS } from "./jewelry";
import { HOME_PRODUCTS } from "./home";
import { KITCHEN_PRODUCTS } from "./kitchen";
import { BEAUTY_PRODUCTS } from "./beauty";
import { FRAGRANCE_PRODUCTS } from "./fragrance";
import { ART_PRODUCTS } from "./art";
import { TECH_PRODUCTS } from "./tech";
import { WELLNESS_PRODUCTS } from "./wellness";
import { OUTDOORS_PRODUCTS } from "./outdoors";
import { BOOKS_STATIONERY_PRODUCTS } from "./books-stationery";
import { PLANTS_PRODUCTS } from "./plants";
import { FOOD_DRINK_PRODUCTS } from "./food-drink";

// Re-export individual category arrays
export {
  FASHION_PRODUCTS,
  SHOES_PRODUCTS,
  BAGS_ACCESSORIES_PRODUCTS,
  JEWELRY_PRODUCTS,
  HOME_PRODUCTS,
  KITCHEN_PRODUCTS,
  BEAUTY_PRODUCTS,
  FRAGRANCE_PRODUCTS,
  ART_PRODUCTS,
  TECH_PRODUCTS,
  WELLNESS_PRODUCTS,
  OUTDOORS_PRODUCTS,
  BOOKS_STATIONERY_PRODUCTS,
  PLANTS_PRODUCTS,
  FOOD_DRINK_PRODUCTS,
};

// Combined array of all ~455 products
export const ALL_PRODUCTS: Product[] = [
  ...FASHION_PRODUCTS,
  ...SHOES_PRODUCTS,
  ...BAGS_ACCESSORIES_PRODUCTS,
  ...JEWELRY_PRODUCTS,
  ...HOME_PRODUCTS,
  ...KITCHEN_PRODUCTS,
  ...BEAUTY_PRODUCTS,
  ...FRAGRANCE_PRODUCTS,
  ...ART_PRODUCTS,
  ...TECH_PRODUCTS,
  ...WELLNESS_PRODUCTS,
  ...OUTDOORS_PRODUCTS,
  ...BOOKS_STATIONERY_PRODUCTS,
  ...PLANTS_PRODUCTS,
  ...FOOD_DRINK_PRODUCTS,
];

// Category-to-products mapping for filtered views
export const CATEGORY_PRODUCTS: Record<string, Product[]> = {
  fashion: FASHION_PRODUCTS,
  shoes: SHOES_PRODUCTS,
  bags: BAGS_ACCESSORIES_PRODUCTS,
  jewelry: JEWELRY_PRODUCTS,
  home: HOME_PRODUCTS,
  kitchen: KITCHEN_PRODUCTS,
  beauty: BEAUTY_PRODUCTS,
  fragrance: FRAGRANCE_PRODUCTS,
  art: ART_PRODUCTS,
  tech: TECH_PRODUCTS,
  wellness: WELLNESS_PRODUCTS,
  outdoors: OUTDOORS_PRODUCTS,
  books: BOOKS_STATIONERY_PRODUCTS,
  plants: PLANTS_PRODUCTS,
  food: FOOD_DRINK_PRODUCTS,
};
