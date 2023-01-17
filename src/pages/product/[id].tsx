import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { ProductInterface } from "../../context/CartContext"
import { useCart } from "../../hooks/useCart"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductsInterface {
    product: ProductInterface
}


export default function Product({ product }: ProductsInterface) {
    const { isFallback } = useRouter()

    const { checkIfItemAlreadyExists, addToCart } = useCart()
    const itemAlreadyInCart = checkIfItemAlreadyExists(product.id)

    if (isFallback) {
        return <p>Loading... </p>
    }


    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>

                    <Image src={product.imageUrl} width={520} height={480} alt="" />

                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button disabled={itemAlreadyInCart} onClick={() => addToCart(product)}>
                        {itemAlreadyInCart ? "Produto já está no carrinho " : "Comprar agora"}
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_NAGFnHv94V31mp' } }
        ],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"]
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
            }
        },
        revalidate: 60 * 60 * 1
    }
}