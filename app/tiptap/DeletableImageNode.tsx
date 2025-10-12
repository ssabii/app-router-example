import type { NodeViewProps } from "@tiptap/react"
import { NodeViewWrapper } from "@tiptap/react"
import { DeletableImageNodeOptions } from "./deletable-image-node-extension"

function DeletableImageNode(props: NodeViewProps) {
  const { selected, deleteNode } = props
  const { src, alt, title } = props.node.attrs
  const options = props.extension.options as DeletableImageNodeOptions
  const { onDelete } = options

  return (
    <NodeViewWrapper
      className={`
        relative my-2 inline-block
        ${selected ? 'ring-2 ring-blue-400' : ''}
      `}
      data-drag-handle
    >
      <img
        src={src}
        alt={alt}
        title={title}
        loading="lazy"
      />
      <button
        type="button"
        aria-label="이미지 삭제"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          deleteNode()             // ← 이 한 줄로 이미지 삭제
          onDelete?.()
        }}
        className={`
          absolute -right-2 -top-2 size-6 rounded-full bg-black/70 text-center text-sm leading-6
          text-white shadow
          hover:bg-black
        `}
      >
        ×
      </button>
    </NodeViewWrapper>
  )
}

export default DeletableImageNode;