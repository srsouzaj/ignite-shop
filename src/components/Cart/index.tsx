import * as Dialog from "@radix-ui/react-dialog"
import { CartButton } from "../CartButton"
import { X } from 'phosphor-react'
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styled"
import Image from "next/future/image"

export const Cart = () => {
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
                        {/* 
                    <section>
                        <p>Parece que seu carrinho está vazio</p>
                    */}

                        <CartProduct>
                            <CartProductImage>
                                <Image
                                    height={90}
                                    width={100}
                                    alt=""
                                    src={"https://s3-alpha-sig.figma.com/img/fd95/f0b2/85d51884517403ad7e3fc5c12726f99a?Expires=1674432000&Signature=fFZYZ8tc8ec4dV477utaxB9MRrTLm03SiOOLQaRg5cddizoTnE499w9DVFDRtvPYoGYm1EEKCGjhM~JxRppp3wzq0nGhr6YHzaGEE3hMzCMB~~mq2oOVcBIOH01J~Cc1QytF7dS95YELUUITOGywD6FXjnltEMQ8Jc1E93UFfFQ-L6NZ1tiKYMc~8rdrwd77a42Gw155byO8GQeqbUkPCrIGB5QDzvmlTeaNNiO2dK6978qFixasSJ1kUMne4UWwUgiVSN9GE7y8RJ-~S0W3vTn1nq5LXu7zffNpe2mfA1hLgmtRfCgCvW3bJIB~mQ8y9poGY4ppR54yUSKJuHE~uA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"}
                                />
                            </CartProductImage>
                            <CartProductDetails>
                                <p>Produto 1</p>
                                <strong>R$ 79,00</strong>
                                <button>Remover</button>
                            </CartProductDetails>
                        </CartProduct>
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