import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import DeletableImageNodeComponent from './DeletableImageNode'

const DeletableImageNode = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(DeletableImageNodeComponent)
  },
})

export default DeletableImageNode;