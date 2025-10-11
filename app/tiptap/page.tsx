'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ImageUploadNode } from './image-upload-node-extension';
import DeletableImageNode from './deletable-image-node-extension';
import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

function Page() {
  const [imageCount, setImageCount] = useState(0);
  const getImageContent = (): Promise<string> => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`
          <h1>이미지가 포함된 컨텐츠</h1>
          <img src="https://placehold.co/100x100" alt="첫 번째 이미지" />
          <img src="https://placehold.co/400x200" alt="두 번째 이미지" />
          <img src="https://placehold.co/800x640" alt="세 번째 이미지" />
        `)
      }, 3000)
    })
  };

  const { data } = useQuery({
    queryKey: ['image-content'],
    queryFn: getImageContent,
  });

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
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    },
    onUpdate: () => {
      // 에디터 내용이 변경될 때마다 이미지 개수 업데이트
      updateImageCount();
    }
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

  // 에디터가 초기화될 때 이미지 개수 업데이트
  useEffect(() => {
    if (editor && data) {
      editor.commands.setContent(data);
      updateImageCount();
    }
  }, [data, editor, updateImageCount]);

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

export default Page;