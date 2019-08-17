import React from "react"
import styled from "styled-components/macro"
import CKEditor from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import Input from "../Input"

const Wrapper = styled.div`
  /* Overrides the border radius setting in the theme. */
  --ck-border-radius: 4px;

  /* Overrides the default font size in the theme. */
  --ck-font-size-base: 14px;

  /* Helper variables to avoid duplication in the colors. */
  --ck-custom-background: var(--secondary-background);
  --ck-custom-foreground: var(--input-background);
  --ck-custom-border: var(--input-border);
  --ck-custom-white: var(--input-color);

  /* -- Overrides generic colors. ------------------------------------------------------------- */

  --ck-color-base-background: var(--ck-custom-foreground);
  --ck-color-base-foreground: var(--ck-custom-background);
  --ck-color-focus-border: hsl(208, 90%, 62%);
  --ck-color-text: hsl(0, 0%, 98%);
  --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
  --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);

  /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

  --ck-color-button-default-background: transparent;
  --ck-color-button-default-hover-background: var(--muted-background);
  --ck-color-button-default-active-background: var(--muted-background);
  --ck-color-button-default-active-shadow: var(--muted-background);
  --ck-color-button-default-disabled-background: transparent;

  --ck-color-button-on-background: var(--muted-background);
  --ck-color-button-on-hover-background: var(--muted-background);
  --ck-color-button-on-active-background: var(--muted-background);
  --ck-color-button-on-active-shadow: var(--muted-background);
  --ck-color-button-on-disabled-background: transparent;

  --ck-color-button-action-background: hsl(168, 76%, 42%);
  --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
  --ck-color-button-action-active-background: hsl(168, 76%, 36%);
  --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
  --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
  --ck-color-button-action-text: var(--ck-custom-white);

  --ck-color-button-save: hsl(120, 100%, 46%);
  --ck-color-button-cancel: hsl(15, 100%, 56%);

  /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

  --ck-color-dropdown-panel-background: var(--muted-background);
  --ck-color-dropdown-panel-border: var(--input-border);

  /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

  --ck-color-input-background: var(--ck-custom-foreground);
  --ck-color-input-border: hsl(257, 3%, 43%);
  --ck-color-input-text: hsl(0, 0%, 98%);
  --ck-color-input-disabled-background: hsl(255, 4%, 21%);
  --ck-color-input-disabled-border: hsl(250, 3%, 38%);
  --ck-color-input-disabled-text: hsl(0, 0%, 46%);

  /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

  --ck-color-list-background: var(--ck-custom-background);
  --ck-color-list-button-hover-background: var(--ck-color-base-foreground);
  --ck-color-list-button-on-background: var(--ck-color-base-active);
  --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
  --ck-color-list-button-on-text: var(--ck-color-base-background);

  /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

  --ck-color-panel-background: var(--ck-custom-background);
  --ck-color-panel-border: var(--ck-custom-border);

  /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

  --ck-color-toolbar-background: var(--ck-custom-background);
  --ck-color-toolbar-border: var(--ck-custom-border);

  /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

  --ck-color-tooltip-background: hsl(252, 7%, 14%);
  --ck-color-tooltip-text: hsl(0, 0%, 93%);

  /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

  --ck-color-image-caption-background: hsl(0, 0%, 97%);
  --ck-color-image-caption-text: hsl(0, 0%, 20%);

  /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

  --ck-color-widget-blurred-border: hsl(0, 0%, 87%);
  --ck-color-widget-hover-border: hsl(43, 100%, 68%);
  --ck-color-widget-editable-focus-background: var(--ck-custom-white);

  /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

  --ck-color-link-default: hsl(190, 100%, 75%);

  /* Style overrides */

  .ck.ck-reset_all,
  .ck.ck-reset_all * {
    font-family: inherit;
  }

  .ck-content {
    color: var(--input-color);
  }
`

const RichTextInput: React.FunctionComponent<{
  label: string
  value: string
  onChange: (value: string) => void
}> = ({ label, value, onChange, ...props }) => {
  return (
    <Input label={label} {...props}>
      {_ => (
        <Wrapper>
          <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(_event, editor) => onChange(editor.getData())}
          />
        </Wrapper>
      )}
    </Input>
  )
}

export default RichTextInput
