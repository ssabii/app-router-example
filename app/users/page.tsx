import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { getUsers } from "@/apis/users"
import { Suspense } from "react"
import Users from "./Users"

export default async function UsersPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  )
}