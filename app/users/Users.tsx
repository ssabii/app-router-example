'use client';

import { getUsers } from "@/apis/users"
import { useQuery } from "@tanstack/react-query"

export default function Users() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <div className="flex flex-col gap-2 p-4">
      {data?.map(({ id, name, username, email }) => (
        <div key={id} className="rounded-lg p-4 shadow-lg">
          <div className="text-lg">
            {`${name} ${username}`}
          </div>
          <div className="text-base text-slate-600">
            {email}
          </div>
        </div>
      ))}
    </div>
  )
}