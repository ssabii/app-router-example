'use client'

import Button from '@/components/Button';
import Image from '@tiptap/extension-image';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ImageUploadNode } from './image-upload-node-extension';

function Page() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: 500 * 1024 * 1024,
        limit: 1,
      })
    ],
    content: '<p>Hello World</p>',
    immediatelyRender: false,
  })

  const handleClick = () => {
    if (!editor) {
      return;
    }

    editor
      .chain()
      .focus()
      .insertContent({
        type: "imageUpload",
      })
      .run()
  }

  return (
    <div>
      <Button onClick={handleClick}>
        이미지 업로드
      </Button>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Page;