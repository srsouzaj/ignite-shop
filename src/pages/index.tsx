import Head from "next/head"
import Image from "next/future/image"
import Link from "next/link"
import { GetStaticProps } from "next"

import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { HomeContainer, Product, SliderContainer } from "../styles/pages/home"
import useEmblaCarousel from "embla-carousel-react"
import { CartButton } from "../components/CartButton"
import { useCart } from "../hooks/useCart"
import { ProductInterface } from "../context/CartContext"
import { MouseEvent, useEffect, useState } from 'react'
import { ProductSkeleton } from "../components/ProductSkeleton"

interface HomeInterface {
  products: ProductInterface[]
}

export default function Home({ products }: HomeInterface) {
  const [isLoading, setIsLoading] = useState(true)

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true
  })

  useEffect(() => { const timeOut = setTimeout(() => setIsLoading(false), 2000) }, [])

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  const handleAddToCart = (
    e: MouseEvent<HTMLButtonElement>, product: ProductInterface) => {
    e.preventDefault();
    addToCart(product);
  }


  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <div style={{ overflow: "hidden", width: "100%" }}>

        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {isLoading ? (
                <>
                  <ProductSkeleton className="embla__container container" />
                  <ProductSkeleton className="embla__container container" />
                  <ProductSkeleton className="embla__container container" />

                </>) : (
                <>
                  {products.map(product => {
                    return (
                      <Link href={`/product/${product.id}`}
                        key={product.id}
                        prefetch={false}
                      >
                        <Product
                          className="embla__slide">
                          <Image src={product.imageUrl} width={520} height={480} alt="" />

                          <footer>
                            <div>
                              <strong>{product.name}</strong>
                              <span>{product.price}</span>
                            </div>
                            <CartButton color="green" size="large"
                              disabled={checkIfItemAlreadyExists(product.id)}
                              onClick={(e) => handleAddToCart(e, product)} />
                          </footer>
                        </Product>
                      </Link>
                    )
                  })}</>
              )}

            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({ expand: ['data.default_price'] })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },

    revalidate: 60 * 60 * 2 //2 horas
  }
}