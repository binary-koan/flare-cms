import React from "react"
import { useDispatch } from "react-redux"
import ItemList, { Item } from "../components/ItemList"
import FieldRow from "../components/fields/FieldRow"
import TagsField from "../components/fields/TagsField"
import DateField from "../components/fields/DateField"
import TextInput from "../components/inputs/TextInput"

export const ListBlogPosts: React.FunctionComponent<{ documents: any[] }> = ({ documents }) => (
  <ItemList>
    {documents.map(document => (
      <Item
        key={document.id.$objectId}
        title={document.current.data.title}
        description={document.current.data.body}
        to={`/content/blog-posts/${document.id.$objectId}`}
        caption={
          <FieldRow>
            <TagsField items={document.current.data.tags || []} />
            <DateField date={document.current.data.publishedAt} />
          </FieldRow>
        }
      />
    ))}
  </ItemList>
)

export const BlogPostForm: React.FunctionComponent<{
  document: any
  fieldValues: any
  edit: (fieldPath: string, value: any) => void
}> = ({ fieldValues, edit }) => (
  <TextInput
    label="Title"
    variant="heading1"
    value={fieldValues.title}
    onChange={value => edit("title", value)}
  />
)
