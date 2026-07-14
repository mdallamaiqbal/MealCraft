import { headers } from "next/headers"
import {auth} from "../auth"

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    role: string;
}
export const getUserSession = async (): Promise<User | undefined> => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user as User
}