import { serverFetch } from "./core/server";

export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}


interface ApiResponse {
  success: boolean;
  count?: number;
  data: FoodItem[];
}

export const getAllFood = async (): Promise<FoodItem[]> => {
  try {
    const response = await serverFetch<ApiResponse>("/api/foods");
    
    if (response.success) {
      return response.data; 
    }
    
    return [];
  } catch (error) {
    console.error("Error inside getAllFood:", error);
    return [];
  }
};

export async function getSingleFood(id: string): Promise<FoodItem | null> {
  try {
    const res = await serverFetch<{ success: boolean; data: FoodItem }>(`/api/foods/${id}`);
    return res.success ? res.data : null;
  } catch (error) {
    console.error("Error fetching single food:", error);
    return null;
  }
}