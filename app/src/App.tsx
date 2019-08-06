import React from "react"
import styled, { ThemeProvider } from "styled-components/macro"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import theme from "./styles/theme"
import Sidebar from "./components/navigation/Sidebar"
import Home from "./pages/Home"
import BlogPosts from "./pages/BlogPosts"
import BlogPost from "./pages/BlogPost"
import store from "./store"
import { GlobalStyle } from "./styles/GlobalStyle"

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Wrapper>
          <GlobalStyle />
          <Sidebar />

          <Route path="/" exact component={Home} />
          <Route path="/content/blog-posts" exact component={BlogPosts} />
          <Route path="/content/blog-posts/:id" exact component={BlogPost} />
        </Wrapper>
      </Router>
    </Provider>
  </ThemeProvider>
)

export default App
