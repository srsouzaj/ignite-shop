import { AppProps } from "next/app";
import Logo from "../assets/Logo";
import { Header } from "../components/Header";
import { CartContextProvider } from "../context/CartContext";
import { globalStyles } from "../styles/global";


import { Container } from "../styles/pages/app";

globalStyles();

function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  );
}

export default App;
