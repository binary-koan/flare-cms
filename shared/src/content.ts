import { Config, EditorWidth } from "./types"

const config: Config = {
  contentTypes: [
    {
      id: "blog-posts",
      name: "Blog Posts",
      singularName: "Blog Post",
      listViews: [
        {
          type: "cards",
          titleAttributes: ["title"],
          descriptionAttributes: ["body"],
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
      ],
      attributes: [
        {
          id: "title",
          name: "Title",
          type: {
            data: "string",
            field: {
              type: "text",
              truncate: 100
            },
            editor: {
              type: "text",
              variant: "heading1",
              width: EditorWidth.HALF
            }
          }
        },
        {
          id: "body",
          name: "Article",
          type: {
            data: "string",
            field: {
              type: "text",
              stripHtml: true,
              truncate: 300
            },
            editor: {
              type: "richText"
            }
          }
        }
      ]
    }
  ]
}

export default config