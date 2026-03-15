import { Metadata } from "next";
import CartClient from "./components/CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart | Finglo Sarees",
  description: "View and manage your shopping cart items",
};

export default function CartPage() {
  return <CartClient />;
}
