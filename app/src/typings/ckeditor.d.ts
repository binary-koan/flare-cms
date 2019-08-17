declare module "@ckeditor/ckeditor5-react" {
  const CKEditor: React.FunctionComponent<{
    editor: any
    data: string
    onInit?: (editor: any) => void
    onChange?: (event: Event, editor: any) => void
    onFocus?: (editor: any) => void
    onBlur?: (editor: any) => void
  }>
  export default CKEditor
}

declare module "@ckeditor/ckeditor5-build-classic" {
  const ClassicEditor: any
  export default ClassicEditor
}
