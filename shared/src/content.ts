import { Config, EditorWidth } from "./types"

const config: Config = {
  contentTypes: [
    {
      id: "blog-posts",
      name: "Blog Posts",
      singularName: "Blog Post",
      editableAttributes: [
        {
          id: "title",
          name: "Title",
          data: "string",
          editor: {
            type: "text",
            variant: "heading1",
            width: EditorWidth.HALF
          }
        },
        {
          id: "body",
          name: "Article",
          data: "string",
          editor: {
            type: "richText"
          }
        }
      ],
      listViews: [
        {
          type: "cards",
          titleFields: [
            {
              attribute: "title",
              type: "text",
              truncate: 100
            }
          ],
          descriptionFields: [
            {
              attribute: "body",
              type: "text",
              truncate: 300,
              stripHtml: true
            }
          ]
        }
      ],
      filters: [
        {
          type: "contains",
          name: "Search ...",
          attributes: ["title", "body"],
          editor: {
            type: "text",
            variant: "paragraph"
          }
        }
      ]
    }
  ]
}

export default config
