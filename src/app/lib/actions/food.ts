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


 

//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// export const getArtById = async (id) => {
//     const res = await fetch(`${baseUrl}/api/arts/${id}`, {
//         method: 'GET'
//     });
//     return res.json();
// };