import { validateRequest } from "@/lib/auth"
import { MainFeed } from "@/app/components/feed/MainFeed"

export default async function Page() {

  const { user } = await validateRequest()

  return (
    <MainFeed userId={user?.id as string} />
  )
}