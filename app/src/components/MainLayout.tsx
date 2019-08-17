import styled from "styled-components/macro"

const MainContent = styled.div`
  flex: 0 1 50%;
  padding: 1rem 1.5rem;
  background-color: var(--muted-background);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
`

const SecondaryContent = styled.div`
  overflow-y: auto;
`

const MainLayout = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`

export { MainContent, SecondaryContent }
export default MainLayout
