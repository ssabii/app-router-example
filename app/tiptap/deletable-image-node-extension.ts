import Image, { ImageOptions } from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import DeletableImageNodeComponent from './DeletableImageNode'

export interface DeletableImageNodeOptions extends ImageOptions {
  onDelete?: () => void;
}

const DeletableImageNode = Image.extend<DeletableImageNodeOptions>({
  addNodeView() {
    return ReactNodeViewRenderer(DeletableImageNodeComponent)
  },
})

export default DeletableImageNode;