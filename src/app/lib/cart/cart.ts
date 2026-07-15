
export interface CartItemInput {
    userId: string;
    foodId: string;
    quantity: number;
}

export interface CartItemResponse {
    _id: string;        // Food ID
    cartItemId: string; // Cart Document ID
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 
export async function addToCart(cartData: CartItemInput): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        });

        const result: ApiResponse<null> = await response.json();
        return result;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update cart';
        return { success: false, error: errorMessage };
    }
}

export async function getCartItems(userId: string): Promise<ApiResponse<CartItemResponse[]>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });

        const result: ApiResponse<CartItemResponse[]> = await response.json();
        return result;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart items';
        return { success: false, error: errorMessage, data: [] };
    }
}

export async function removeFromCart(userId: string, foodId: string): Promise<ApiResponse<null>> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/${userId}/${foodId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: ApiResponse<null> = await response.json();
        return result;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
        return { success: false, error: errorMessage };
    }
}