import * as Dialog from "@radix-ui/react-dialog"
import { CartButton } from "../CartButton"
import { X } from 'phosphor-react'
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styled"
import Image from "next/future/image"
import { useCart } from "../../hooks/useCart"

export const Cart = () => {
    const { cartItems } = useCart()

    console.log(cartItems.length)
    // const cartQuantity = cartItems.length;

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
                        {/* {cartQuantity >= 0 ? (
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
                                        <button>Remover</button>
                                    </CartProductDetails>
                                </CartProduct>
                            ))
                        ) : <p>Parece que seu carrinho está vazio</p>} */}
                    </section>

                    <CartFinalization>
                        <FinalizationDetails>

                            <div>
                                <span>Quantidade</span>
                                <p>2 itens</p>
                            </div>
                            <div>
                                <span>Valor Total</span>
                                <p>R$ 100,00</p>
                            </div>
                        </FinalizationDetails>
                        <button>Finalizar</button>
                    </CartFinalization>

                </CartContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}