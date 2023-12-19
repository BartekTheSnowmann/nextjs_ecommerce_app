import React from "react";
import { getCart } from "../product/[id]/actions";
import CartItem from "./CartItem";
import changeQuantity from "./actions";
import { Button } from "@radix-ui/themes";
import FormatPrice from "@/lib/db/utils/formatPrice";
import CheckoutBtn from "./CheckoutBtn";
import EmptyCart from "../components/EmptyCart";

async function page() {
  const cartItems = await getCart();

  if (!cartItems?.items.length) {
    return <EmptyCart />;
  }

  let price = cartItems.items
    .map((item) => item.quantity * item.product.price)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  return (
    <section className="flex flex-col gap-4 px-4 py-16">
      {cartItems?.items?.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          changeQuantity={changeQuantity}
        />
      ))}

      <div className="flex pt-8">
        <FormatPrice className="w-fit" price={price} />
        <Button variant="solid" className="w-fit rounded-l-none">
          <CheckoutBtn />
        </Button>
      </div>
    </section>
  );
}

export default page;
