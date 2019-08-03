import React, { useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import styled from "styled-components/macro"
import MainLayout, { MainContent, SecondaryContent } from "../components/MainLayout"
import { PrimaryButton } from "../components/Button"
import ItemList, { Item } from "../components/ItemList"
import TagsField from "../components/fields/TagsField"
import DateField from "../components/fields/DateField"
import FieldRow from "../components/fields/FieldRow"
import Loading from "../components/Loading"
import FatalError from "../components/FatalError"
import useOperation from "../hooks/useOperation"
import { loadData } from "../store/list/operations"

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  margin: 0 auto 0 0;
  font-size: 1.563rem;
`

const posts = [
  {
    id: 1,
    title: "Some Title",
    body: "Some body",
    tags: ["one", "two"],
    publishedAt: new Date()
  }
]

const BlogPosts: React.SFC = props => {
  const listState = useSelector(state => state.list, shallowEqual)
  const load = useOperation(loadData)

  useEffect(() => {
    load()
  }, [])

  if (listState.loadingState === "loading") {
    return <Loading />
  }

  if (listState.loadingState === "error") {
    return <FatalError error={listState.error} />
  }

  return (
    <MainLayout {...props}>
      <MainContent>
        <Header>
          <Title>Blog Posts</Title>
          <PrimaryButton icon="add">Create Post</PrimaryButton>
        </Header>

        <ItemList>
          {posts.map(post => (
            <Item
              key={post.id}
              title={post.title}
              description={post.body}
              caption={
                <FieldRow>
                  <TagsField items={post.tags} />
                  <DateField date={post.publishedAt} />
                </FieldRow>
              }
            />
          ))}
        </ItemList>
      </MainContent>
      <SecondaryContent />
    </MainLayout>
  )
}

export default BlogPosts
