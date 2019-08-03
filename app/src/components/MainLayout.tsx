import styled from "styled-components/macro"

const MainContent = styled.div`
  flex: 0 1 50%;
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.color.mutedBackground};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

const SecondaryContent = styled.div``

const MainLayout = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`

export { MainContent, SecondaryContent }
export default MainLayout
