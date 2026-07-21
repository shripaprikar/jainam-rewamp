import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { 
  ClassicEditor, 
  SourceEditing, 
  GeneralHtmlSupport,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Link,
  List,
  Table,
  TableToolbar,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageUpload,
  ImageInsert,
  Base64UploadAdapter
} from 'ckeditor5' // 👈 Import everything from the unified package
// @ts-ignore
import 'ckeditor5/ckeditor5.css' // 👈 Ensure CKEditor styles are loaded
import { FormField } from 'sanity'
import { set, unset } from 'sanity'

type CKEditorInputProps = {
  elementProps?: any
  onChange: (patch: any) => void
  value?: string
  schemaType?: any
}

export const CKEditorInput: React.FC<CKEditorInputProps> = (props) => {
  const { elementProps, onChange, value = '', schemaType } = props

  const handleEditorChange = (event: any, editor: any): void => {
    const data = editor.getData()
    onChange(data ? set(data) : unset())
  }

  return (
    <FormField
      path={schemaType?.name ? [schemaType.name] : []}
      description={schemaType.description}
      validation={schemaType.validation}
    >
      <div {...elementProps}>
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={handleEditorChange}
          config={{
            licenseKey: 'GPL', 
            // 1. Inject the necessary plugins into your editor instance
            plugins: [ 
              Essentials, Paragraph, Heading, Bold, Italic, 
              Link, List, Table, TableToolbar, 
              Image, ImageToolbar, ImageCaption, ImageStyle, ImageUpload, ImageInsert,
              SourceEditing, GeneralHtmlSupport, Base64UploadAdapter
            ],
            
            // 2. Add the source toggle item to your toolbar layout
            toolbar: [
              'undo', 'redo', '|',
              'heading', '|',
              'bold', 'italic', 'link', '|',
              'bulletedList', 'numberedList', 'insertTable', '|', 'ImageUpload', '|', 'ImageInsert', '|' ,
              'sourceEditing' // 👈 Your HTML Toggle
            ],

            // Extra sub-toolbars for tables and image contexts
            table: {
              contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            },
            image: {
              toolbar: [ 'imageTextAlternative', 'imageStyle:inline', 'imageStyle:block' ]
            },

            // 3. Keep Sanity from losing unmapped tags when toggling back and forth
            htmlSupport: {
              allow: [
                {
                  name: /.*/,
                  attributes: true,
                  classes: true,
                  styles: true
                }
              ]
            }
          }}
        />
      </div>
    </FormField>
  )
}
