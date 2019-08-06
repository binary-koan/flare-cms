import React, { useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import styled from "styled-components/macro"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"
import { PrimaryButton, SecondaryButton, ButtonRow } from "../components/Button"
import Loading from "../components/Loading"
import FatalError from "../components/FatalError"
import useOperation from "../hooks/useOperation"
import { loadData, saveDraft } from "../store/form/operations"
import { BlogPostForm } from "../content/BlogPosts"
import { withRouter, RouteComponentProps } from "react-router"

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-size: 1.563rem;
`

const BlogPosts: React.FunctionComponent<RouteComponentProps<{ id: string }>> = ({
  match,
  ...props
}) => {
  const formState = useSelector(state => state.form, shallowEqual)
  const load = useOperation(loadData)
  const save = useOperation(saveDraft)
  const dispatch = useDispatch()

  useEffect(() => {
    load({ id: match.params.id })
  }, [])

  if (formState.loadingState === "loading") {
    return <Loading />
  }

  if (formState.loadingState === "error") {
    return <FatalError error={formState.error} />
  }

  return (
    <MainLayout {...props}>
      <MainContent>
        <Header>
          <Title>Edit Blog Post</Title>
          <ButtonRow>
            <PrimaryButton
              icon="save-2"
              iconType="line"
              disabled={formState.savingState === "saving"}
              onClick={() => save(formState)}
            >
              Save Draft
            </PrimaryButton>
            <SecondaryButton icon="file-copy" iconType="line" />
            <SecondaryButton icon="archive" iconType="line" />
          </ButtonRow>
        </Header>

        <BlogPostForm
          document={formState.loadedData}
          fieldValues={formState.fieldValues}
          edit={(fieldPath, value) =>
            dispatch({ namespace: "form", type: "edit", path: fieldPath, value })
          }
        />
      </MainContent>
      <SecondaryContent />
    </MainLayout>
  )
}

export default withRouter(BlogPosts)
