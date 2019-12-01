import React, { useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import styled from "styled-components/macro"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"
import { PrimaryButton, SecondaryButton, ButtonRow } from "../components/Button"
import Loading from "../components/Loading"
import FatalError from "../components/FatalError"
import useOperation from "../hooks/useOperation"
import { loadBlankData, saveDraft } from "../store/form/operations"
import { ContentType } from "@shared/types"
import Form from "@src/components/Form"
import Editor from "@src/components/Editor"
import useRouter from "@src/hooks/useRouter"

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-size: 1.563rem;
`

const ContentNew: React.FunctionComponent<{ contentType: ContentType }> = ({
  contentType,
  ...props
}) => {
  const formState = useSelector(state => state.form, shallowEqual)
  const initialize = useOperation(loadBlankData)
  const save = useOperation(saveDraft)
  const { history } = useRouter()

  useEffect(() => {
    initialize({ contentType })
  }, [])

  useEffect(() => {
    if (formState.loadedData && formState.loadedData.id) {
      history.push(`/content/${contentType.id}/${formState.loadedData.id.$objectId}`)
    }
  }, [formState.loadedData && formState.loadedData.id])

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
          <Title>New {contentType.singularName}</Title>
          <ButtonRow>
            <PrimaryButton
              icon="save-2"
              iconType="line"
              disabled={formState.savingState === "saving"}
              onClick={() => save(formState)}
            >
              Save Draft
            </PrimaryButton>
            <SecondaryButton disabled icon="file-copy" iconType="line" />
            <SecondaryButton disabled icon="archive" iconType="line" />
          </ButtonRow>
        </Header>

        <Form>
          {contentType.editableAttributes.map(item => (
            <Editor key={item.id} path={[item.id]} name={item.name} editor={item.editor} />
          ))}
        </Form>
      </MainContent>
      <SecondaryContent />
    </MainLayout>
  )
}

export default ContentNew
