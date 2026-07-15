import React from "react";
import CartClient from "./cartClient";
import { getUserSession } from "../lib/session/session";
import Link from "next/link";

export default async function CartPage() {
  const session = await getUserSession();
  
 const sessionData = (session as unknown) as Record<string, unknown>;

  const userId = 
    (sessionData?._id as string) || 
    ((sessionData?.user as Record<string, unknown>)?._id as string) || 
    (sessionData?.id as string) || 
    ((sessionData?.user as Record<string, unknown>)?.id as string) || 
    "";
  
  if (!userId) {
    return (
      <div className="text-center py-20 text-zinc-500 font-medium">
        Please <Link href="/login" className="text-amber-500 underline">Login</Link> to view your cart.
      </div>
    );
  }

  return <CartClient userId={userId} />;
}