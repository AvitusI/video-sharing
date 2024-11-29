//import { MediaRoom } from "@/app/components/MediaRoom"
import { LiveHeader } from "@/app/components/live/LiveHeader"
import { LiveEvent } from "@/app/components/live/LiveEvent"
import { ScheduleEvent } from "@/app/components/live/ScheduleEvent"

export default function Live() {
  return (
    <div className="pt-16 h-screen">  
        <LiveHeader />
        <LiveEvent />
        <ScheduleEvent />
    </div>
  )
}
