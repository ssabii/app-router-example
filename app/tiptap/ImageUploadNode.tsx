import Button from "@/components/Button";
import type { NodeViewProps } from "@tiptap/react"
import { NodeViewWrapper } from "@tiptap/react"

function ImageUploadNode(props: NodeViewProps) {
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