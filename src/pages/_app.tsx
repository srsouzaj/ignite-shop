import { AppProps } from "next/app";
import Logo from "../assets/Logo";
import { Header } from "../components/Header";
import { globalStyles } from "../styles/global";


import { Container } from "../styles/pages/app";

globalStyles();

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
