import { notificationEnums } from "@/app/lib/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ExploreNotification } from "@/app/components/ExploreNotification";

export default function NotificationPage() {
    return (
        <div className="mt-16 p-4">
            <Tabs defaultValue={notificationEnums.enumValues[0]}>
                <ScrollArea>
                    <div className="w-full relative h-12">
                        <TabsList className="flex absolute h-12 w-auto">
                            {notificationEnums.enumValues.map((notification, i) => (
                                <TabsTrigger key={i} value={notification}>
                                    {notification}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                {notificationEnums.enumValues.map((notification) => (
                    <TabsContent key={notification} value={notification}>
                        <ExploreNotification type={notification} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}