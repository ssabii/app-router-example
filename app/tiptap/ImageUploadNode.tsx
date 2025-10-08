import Button from "@/components/Button";
import type { NodeViewProps } from "@tiptap/react"
import { NodeViewWrapper } from "@tiptap/react"
import { memo, useCallback, useEffect, useRef } from "react";
import { ImageUploadNodeOptions } from "./image-upload-node-extension";

function ImageUploadNode(props: NodeViewProps) {
  const { file } = props.node.attrs
  const extension = props.extension
  const options = extension.options as ImageUploadNodeOptions

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  // 이미지 업로드 핸들러를 실행한다.
  // 이미지 업로드가 완료되면 노드를 삭제하고 이미지 노드를 삽입한다.

  const handleUpload = useCallback(async () => {
    if (!file) return

    try {
      const url = await options.upload?.(file)

      if (url) {
        console.log('onSuccess')
        options.onSuccess?.(url)
      }
    } catch (e) {
      options.onError?.(e as Error)
    }
  }, [file, options])

  useEffect(() => {
    handleUpload();
  }, [handleUpload])

  return (
    <NodeViewWrapper tabIndex={0}>
      <div className="relative h-16 w-full animate-pulse bg-gray-200">
        <Button className="absolute right-0 top-0 size-6">
          닫기
        </Button>
      </div>
    </NodeViewWrapper>
  );
}

export default ImageUploadNode;