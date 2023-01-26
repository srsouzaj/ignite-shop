import * as Dialog from "@radix-ui/react-dialog"
import { CartButton } from "../CartButton"
import { X } from 'phosphor-react'
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styled"
import Image from "next/future/image"
import { useCart } from "../../hooks/useCart"
import { useState } from "react"
import axios from "axios"

export const Cart = () => {
    const { cartItems, cartTotal, removeCartItem } = useCart()

    const cartQuantity = cartItems.length;
    const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(cartTotal)

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false);

    async function handleCheckout() {
        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post("/api/checkout", {
                products: cartItems,
            });

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch (err) {
            setIsCreatingCheckoutSession(false);
            alert("Falha ao redirecionar ao checkout!");
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <CartButton />
            </Dialog.Trigger>

            <Dialog.Portal>
                <CartContent>
                    <CartClose> <X size={24} weight="bold" /></CartClose>
                    <h2>Sacola de Compras</h2>

                    <section>
                        {cartQuantity >= 0 ? (
                            cartItems.map(cartItem => (
                                <CartProduct key={cartItem.id}>
                                    <CartProductImage>
                                        <Image
                                            height={90}
                                            width={100}
                                            alt=""
                                            src={cartItem.imageUrl}
                                        />
                                    </CartProductImage>
                                    <CartProductDetails>
                                        <p>{cartItem.name}</p>
                                        <strong>{cartItem.numberPrice}</strong>
                                        <button onClick={() => removeCartItem(cartItem.id)}>Remover</button>
                                    </CartProductDetails>
                                </CartProduct>
                            ))
                        ) : <p>Parece que seu carrinho está vazio</p>}
                    </section>

                    <CartFinalization>
                        <FinalizationDetails>

                            <div>
                                <span>Quantidade</span>
                                <p>{cartQuantity} {cartQuantity > 1 ? "itens" : "item"}</p>
                            </div>
                            <div>
                                <span>Valor Total</span>
                                <p>{formattedCartTotal}</p>
                            </div>
                        </FinalizationDetails>
                        <button
                            onClick={handleCheckout}
                            disabled={isCreatingCheckoutSession || cartQuantity <= 0}>
                            Finalizar
                        </button>
                    </CartFinalization>

                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}