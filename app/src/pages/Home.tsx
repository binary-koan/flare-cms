import React from "react"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"

const Home: React.SFC = props => (
  <MainLayout {...props}>
    <MainContent />
    <SecondaryContent />
  </MainLayout>
)

export default Home
