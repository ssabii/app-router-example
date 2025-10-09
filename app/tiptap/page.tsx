'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ImageUploadNode } from './image-upload-node-extension';
import DeletableImageNode from './deletable-image-node-extension';
import { ChangeEvent, useCallback } from 'react';

function Page() {
  const uploadFile = useCallback(async (file: File, abortSignal?: AbortSignal): Promise<string> => {
    // 여기서 실제 업로드 로직 구현
    // 예시: 3초 후 mock URL 반환
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        const mockUrl = `https://example.com/uploads/${file.name}`
        resolve(mockUrl)
      }, 3000)
    })
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      DeletableImageNode,
      ImageUploadNode.configure({
        upload: uploadFile,
        onSuccess: (url) => {
          console.log('업로드 완료:', url)
        },
        onError: (error) => {
          console.error('업로드 에러:', error)
        }
      })
    ],
    content: '<p>Hello World</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    }
  })

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      editor?.commands.setImageUploadNode({
        file,
        HTMLAttributes: {},
      })
    }
  }, [editor])

  return (
    <div>
      <label htmlFor="image-upload">
        이미지 업로드
      </label>
      <input
        id="image-upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Page;