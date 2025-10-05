'use client'

import Image from '@tiptap/extension-image';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function Page() {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>Hello World</p>',
    immediatelyRender: false,
  })

  return <EditorContent editor={editor} />;
}

export default Page;