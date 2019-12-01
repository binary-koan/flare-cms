import React, { useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import styled from "styled-components/macro"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"
import { PrimaryButton } from "../components/Button"
import Loading from "../components/Loading"
import FatalError from "../components/FatalError"
import useOperation from "../hooks/useOperation"
import { loadData } from "../store/list/operations"
import { ContentType, Field } from "@shared/types"
import ItemList, { Item } from "@src/components/ItemList"
import FieldRow from "@src/components/fields/FieldRow"
import FieldView from "@src/components/Field"
import Filters from "@src/components/Filters"
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
  field: Field
  contentType: ContentType
}> = ({ document, field, contentType, ...props }) => {
  const attribute = contentType.editableAttributes.find(
    attribute => attribute.id === field.attribute
  )

  if (!attribute) return null

  return (
    <FieldView name={attribute.name} value={document.current.data[field.attribute]} field={field} />
  )
}

const CombinedFields: React.FunctionComponent<{
  document: any
  fields: Field[]
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
        <DocumentField
          key={field.attribute}
          field={field}
          document={document}
          contentType={contentType}
        />
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

  if (listState.loadingState === "loading" && !listState.data) {
    return <Loading />
  }

  if (listState.loadingState === "error") {
    return <FatalError error={listState.error} />
  }

  const listView = contentType.listViews[0]

  const presentFields = (document: any, fields: Field[]) => (
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
          {listState.data?.map(document => (
            <Item
              key={document.id.$objectId}
              title={listView.titleFields && presentFields(document, listView.titleFields)}
              description={
                listView.descriptionFields && presentFields(document, listView.descriptionFields)
              }
              caption={listView.captionFields && presentFields(document, listView.captionFields)}
              to={`/content/${contentType.id}/${document.id.$objectId}`}
            />
          ))}
        </ItemList>
      </MainContent>
      <SecondaryContent>
        <Filters filters={contentType.filters || []} />
      </SecondaryContent>
    </MainLayout>
  )
}

export default ContentList
