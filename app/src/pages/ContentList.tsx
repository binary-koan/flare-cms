import React, { useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import styled from "styled-components/macro"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"
import { PrimaryButton } from "../components/Button"
import Loading from "../components/Loading"
import FatalError from "../components/FatalError"
import useOperation from "../hooks/useOperation"
import { loadData } from "../store/list/operations"
import { ContentType } from "@shared/types"
import ItemList, { Item } from "@src/components/ItemList"
import FieldRow from "@src/components/fields/FieldRow"
import Field from "@src/components/Field"
import Filters from "@src/components/Filters"
import { Link } from "react-router-dom"
import useRouter from "@src/hooks/useRouter"

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-size: 1.563rem;
`

const DocumentField: React.FunctionComponent<{
  document: any
  field: string
  contentType: ContentType
}> = ({ document, field, contentType, ...props }) => {
  const attribute = contentType.attributes.find(attribute => attribute.id === field)

  if (!attribute) return null

  return (
    <Field
      name={attribute.name}
      value={document.current.data[field]}
      attributeType={attribute.type}
    />
  )
}

const CombinedFields: React.FunctionComponent<{
  document: any
  fields: string[]
  contentType: ContentType
}> = ({ document, fields, contentType, ...props }) => {
  if (fields.length === 0) {
    return null
  }

  if (fields.length === 1) {
    return <DocumentField field={fields[0]} document={document} contentType={contentType} />
  }

  return (
    <FieldRow {...props}>
      {fields.map(field => (
        <DocumentField key={field} field={field} document={document} contentType={contentType} />
      ))}
    </FieldRow>
  )
}

const ContentList: React.FunctionComponent<{ contentType: ContentType }> = ({
  contentType,
  ...props
}) => {
  const listState = useSelector(state => state.list, shallowEqual)
  const load = useOperation(loadData)
  const { history } = useRouter()

  useEffect(() => {
    load()
  }, [])

  if (listState.loadingState === "loading") {
    return <Loading />
  }

  if (listState.loadingState === "error") {
    return <FatalError error={listState.error} />
  }

  const listView = contentType.listViews[0]

  const presentFields = (document: any, fields: string[]) => (
    <CombinedFields document={document} fields={fields} contentType={contentType} />
  )

  return (
    <MainLayout {...props}>
      <MainContent>
        <Header>
          <Title>{contentType.name}</Title>
          <PrimaryButton icon="add" onClick={() => history.push(`/content/${contentType.id}/new`)}>
            Create {contentType.singularName}
          </PrimaryButton>
        </Header>

        <ItemList>
          {listState.data.map(document => (
            <Item
              key={document.id.$objectId}
              title={listView.titleAttributes && presentFields(document, listView.titleAttributes)}
              description={
                listView.descriptionAttributes &&
                presentFields(document, listView.descriptionAttributes)
              }
              caption={
                listView.captionAttributes && presentFields(document, listView.captionAttributes)
              }
              to={`/content/${contentType.id}/${document.id.$objectId}`}
            />
          ))}
        </ItemList>
      </MainContent>
      <SecondaryContent>
        <Filters listView={listView} />
      </SecondaryContent>
    </MainLayout>
  )
}

export default ContentList
