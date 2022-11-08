ReactJS tradicional, Back e front são separados, apesar da interatividade. Porém trouxe um problema de indexação para bots, SEO, etc, acessando nossa aplicação com JS desabilitados, ou com timeOut curto, não aguardando o retorno da API.

![image-20221008200916792](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008200916792.png)

NextJS nasceu com conceito SSR (Server Side Rendering) por uma necessidade de SEO.



O usuário acessa, primeiro, um backend - um terceiro serviço - que é um servidor escrito em NodeJS - sendo a ponta final do usuário. Ou seja, mesmo do lado do servidor, o NodeJS entende código ReactJS, mesmo do lado do backend. 

Ela carrega todo o código recebido, aguardando ter algo visual em tela.



![image-20221008201706899](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008201706899.png)





Recentemente, outro modelo surgiu do NextJs, conhecido como SSG (Static Site Generation), não sendo necessário várias renderizações ao Backend, apenas se houver alterações em um determinado período de tempo.



## NextJS

NextJS é reactJS.

![image-20221008203721025](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008203721025.png)

Você pode instalar o typescript usando o seguinte comando:

```typescript
npm i typescript @types/react @types/node -D
```

Todas as páginas devem estar dentro de `pages`.

O próprio NextJs tem a página 404 - que é configurável.



## Rotas em NextJS

Para cada página criada é criada uma rota.

Mas, existem rotas que precisam de parâmetros, como id, etc. Neste caso, é necessário criar subpastas ou slugs, que é o nome parametrizado.



![image-20221008205255441](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008205255441.png)

![image-20221008205309528](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008205309528.png)

![image-20221008205504627](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008205504627.png)

![image-20221008205511647](C:\Users\Jorge de Souza\AppData\Roaming\Typora\typora-user-images\image-20221008205511647.png)





## Configurando o projeto

```typescript
//arquivo _document.tsx em src/pages
//cada alteração em document, é necessário reiniciar a aplicação

import { Html, Head, Main, NextScript } from "next/document";

export const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        //conteúdo da página sob demanda
        <Main />
        /* onde carregar o js */
        <NextScript/>
      </body>
    </Html>
  );
};

```

O arquivo `_document.tsx` é a `index.html` de nossa aplicação, sendo carregada em toda nossa aplicação. Não é recomendado colocar arquivos de estilização de `_document.tsx`

Uma dica é mantê-lo mais simples possível.