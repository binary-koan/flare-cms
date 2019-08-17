import "@src/assets/fonts/inter.css"
import { createGlobalStyle } from "styled-components/macro"

export const GlobalStyle = createGlobalStyle`
  /* @import url('https://fonts.googleapis.com/css?family=Libre+Franklin:100,200,300,400,500,600,700,800,900&display=swap'); */

  html {
    font-family: 'Inter', sans-serif;
  }

  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  body {
    background-color: var(--body-background);
    color: var(--body-color);
    height: 100%;
  }

  button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  :root {
    ${({ theme }) => theme.variables}
  }
`
