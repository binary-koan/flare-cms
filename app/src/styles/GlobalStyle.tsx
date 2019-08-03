import { createGlobalStyle } from "styled-components/macro"

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Libre+Franklin:100,200,300,400,500,600,700,800,900&display=swap');

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  body {
    font-family: "Libre Franklin", sans-serif;
    background-color: ${({ theme }) => theme.color.bodyBackground};
    color: ${({ theme }) => theme.color.bodyColor};
    height: 100%;
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`
