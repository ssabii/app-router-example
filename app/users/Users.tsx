'use client';

import { getUsers } from "@/apis/users"
import Button from "@/components/Button";
import Spinner from "@/components/icons/Spinner";
import { useSuspenseQuery } from "@tanstack/react-query"

export default function Users() {
  const { data, isFetching, refetch } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
    <div className="flex flex-col gap-4 p-8">
      <Button
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching && <Spinner className="mr-2 size-4 animate-spin" />}
        fetch
      </Button>
      <div className="flex flex-col gap-2">
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
    </div>
  )
}