import styled, { createGlobalStyle } from 'styled-components'

export const PageWrapper = styled.div`
  padding: 30px;
`

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }  
  body {
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    background-color: #f3f3f3;
    -webkit-font-smoothing: antialiased;
  }
  /** Remove body scroll when modal is open */
  .ReactModal__Body--open {
    overflow: hidden;
  }
`
