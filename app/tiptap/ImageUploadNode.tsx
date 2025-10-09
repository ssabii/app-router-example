import Button from "@/components/Button";
import type { NodeViewProps } from "@tiptap/react"
import { NodeViewWrapper } from "@tiptap/react"
import { useCallback, useEffect, useRef } from "react";
import { ImageUploadNodeOptions } from "./image-upload-node-extension";
import { isValidPosition } from "@/lib/tiptap-utils";

function ImageUploadNode(props: NodeViewProps) {
  const { file } = props.node.attrs;
  const options = props.extension.options;

  const pos = props.getPos()
  const editor = props.editor;
  const nodeSize = props.node.nodeSize;

  // AbortController를 위한 ref
  const abortControllerRef = useRef<AbortController | null>(null)

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

    const { type, upload, onSuccess, onError } = options as ImageUploadNodeOptions;

    // 새로운 AbortController 생성
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const url = await upload?.(file, abortController.signal)
      const isValidPos = isValidPosition(pos);

      // 업로드가 중단되었는지 확인
      if (abortController.signal.aborted) {
        return;
      }

      if (!url) {
        return;
      }

      if (!isValidPos) {
        return;
      }

      onSuccess?.(url)

      const from = pos;
      const to = from + nodeSize;
      const filename = file.name.replace(/\.[^/.]+$/, "") || "unknown";
      const imageNode = {
        type: 'image',
        attrs: {
          src: url,
          alt: filename,
        }
      }

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContentAt(pos, imageNode)
        .run()

    } catch (e) {
      // AbortError가 아닌 경우에만 에러 처리
      if ((e as Error).name !== 'AbortError') {
        onError?.(e as Error)
      }
    } finally {
      // 정리
      abortControllerRef.current = null
    }
  }, [file, nodeSize, options, pos, editor])

  // 업로드 취소 핸들러
  const handleCancel = useCallback(() => {
    // 업로드 중단
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const isValidPos = isValidPosition(pos);

    if (!isValidPos) {
      return;
    }

    // 노드 삭제
    const from = pos;
    const to = from + nodeSize;
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .run()
  }, [pos, nodeSize, editor])

  useEffect(() => {
    if (file) {
      handleUpload();
    }

    // 컴포넌트 언마운트 시 업로드 취소
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [file, handleUpload])

  return (
    <NodeViewWrapper
      tabIndex={0}
      className="relative h-16 w-full overflow-hidden bg-gray-200"
    >
      {/* 프로그레스 바 */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1/5 animate-[slideProgress_2s_ease-in-out_infinite]
          bg-blue-500/50
        `}
      ></div>
      <div>
        {file?.name}
      </div>
      <div>
        {formatFileSize(file?.size ?? 0)}
      </div>
      <Button className="absolute right-0 top-0 size-6"
        onClick={handleCancel}
      >
        닫기
      </Button>
    </NodeViewWrapper>
  );
}

export default ImageUploadNode;