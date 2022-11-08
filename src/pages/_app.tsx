import { AppProps } from "next/app";
import Logo from "../assets/Logo";
import { globalStyles } from "../styles/global";


import { Container, Header } from "../styles/pages/app";

globalStyles();

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}

export default App;
