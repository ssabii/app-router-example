'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ImageUploadNode } from './image-upload-node-extension';
import DeletableImageNode from './deletable-image-node-extension';
import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ContentProps {
  content: string;
}

function Content({ content }: ContentProps) {
  const [imageCount, setImageCount] = useState(0);

  const uploadFile = useCallback(async (file: File, abortSignal?: AbortSignal): Promise<string> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        const mockUrl = `https://example.com/uploads/${file.name}`
        resolve(mockUrl)
      }, 500)
    })
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      DeletableImageNode.configure({
      }),
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
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    },
    onUpdate() {
      console.log('onUpdate');
      updateImageCount();
    },
  })



  // 이미지 개수를 세는 함수 (정규식 사용)
  const updateImageCount = useCallback(() => {
    if (!editor) return;

    const htmlContent = editor.getHTML();
    const imgRegex = /<img[^>]*>/gi;
    const matches = htmlContent.match(imgRegex);
    const count = matches ? matches.length : 0;

    setImageCount(count);
  }, [editor]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      editor?.commands.setImageUploadNode({
        file,
        HTMLAttributes: {},
      })
    }
  }, [editor])

  useEffect(() => {
    updateImageCount();
  }, [updateImageCount]);

  return (
    <div>
      <div className="mb-4 rounded bg-gray-100 p-4">
        <h3 className="text-lg font-semibold">이미지 개수: {imageCount}개</h3>
      </div>
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
      <hr />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Content;