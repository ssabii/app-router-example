import { PropsWithChildren } from "react"
import ReactQueryProvider from "./ReactQueryProvider"

function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>{children}</ReactQueryProvider>
  )
}

export default Providers