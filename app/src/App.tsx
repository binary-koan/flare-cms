import React from "react"
import styled, { ThemeProvider } from "styled-components/macro"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import theme from "./styles/theme"
import Sidebar from "./components/navigation/Sidebar"
import Home from "./pages/Home"
import ContentList from "./pages/ContentList"
import ContentEdit from "./pages/ContentEdit"
import ContentNew from "./pages/ContentNew"
import store from "./store"
import { GlobalStyle } from "./styles/GlobalStyle"

import config from "@shared/content"

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

          {config.contentTypes.map(contentType => (
            <React.Fragment key={contentType.id}>
              <Switch>
                <Route
                  path={`/content/${contentType.id}`}
                  exact
                  render={() => <ContentList contentType={contentType} />}
                />
                <Route
                  path={`/content/${contentType.id}/new`}
                  exact
                  render={() => <ContentNew contentType={contentType} />}
                />
                <Route
                  path={`/content/${contentType.id}/:id`}
                  exact
                  render={() => <ContentEdit contentType={contentType} />}
                />
              </Switch>
            </React.Fragment>
          ))}
        </Wrapper>
      </Router>
    </Provider>
  </ThemeProvider>
)

export default App
