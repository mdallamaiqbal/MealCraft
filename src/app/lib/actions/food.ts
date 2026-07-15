"use server"

import { serverMutation } from "../core/server";

interface FoodInput {
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
}

export const addFood = async (newFoodData: FoodInput) => {
  return serverMutation<unknown, FoodInput>('/api/foods', newFoodData);
};


