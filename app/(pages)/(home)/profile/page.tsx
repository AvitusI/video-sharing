"use client"

import { searchUser } from "@/app/actions/user.actions"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { SearchCommand } from "@/app/components/search/SearchCommand"

export default function Profile() {

  const name = "Avy"

  const search = async () => {
    const res = await searchUser(name)
    if (res.result) {
      toast({
        variant: "default",
        description: "Success!"
      })
      console.log(res.result)
    }
    else if (res.error) {
      toast({
        variant: "destructive",
        description: "Not successful!"
      })
      console.error(res.error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={search}>
        Search
      </Button>
      <div className="p-2">
        <SearchCommand />
        <Button>
          Click
        </Button>
      </div>
    </div>
  )
}
