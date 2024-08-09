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
      {data?.map(({ id, name, username, email, phone }) => (
        <div key={id} className="flex flex-col gap-1 rounded-2xl p-4 shadow-md">
          <div className="text-lg text-slate-900">
            {`${name} ${username}`}
          </div>
          <div className="text-base text-slate-600">
            {email}
          </div>
          <div className="text-sm text-slate-400">
            {phone}
          </div>
        </div>
      ))}
    </div>
  )
}