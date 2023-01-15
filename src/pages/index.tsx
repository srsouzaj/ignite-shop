import Head from "next/head"
import Image from "next/future/image"
import Link from "next/link"
import { GetStaticProps } from "next"

import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { HomeContainer, Product, SliderContainer } from "../styles/pages/home"
import useEmblaCarousel from "embla-carousel-react"
import { CartButton } from "../components/CartButton"

interface HomeInterface {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string
  }[]
}

export default function Home({ products }: HomeInterface) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <div style={{ overflow: "hidden", width: "100%" }}>

        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">

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
                        <CartButton color="green" size="large" />
                      </footer>
                    </Product>
                  </Link>
                )
              })}

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
    }
  })

  return {
    props: {
      products,
    },

    revalidate: 60 * 60 * 2 //2 horas
  }
}