import { categoryEnums } from "@/app/lib/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ExploreContent } from "@/app/components/ExploreContent";

export default function Explore() {
  return (
    <div className="mt-16 p-4">
        <Tabs defaultValue={categoryEnums.enumValues[0]}>
          <ScrollArea>
            <div className="w-full relative h-12">
              <TabsList className="flex absolute h-12 w-auto">
                {categoryEnums.enumValues.map((category, i) => (
                  <TabsTrigger key={i} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
            {categoryEnums.enumValues.map((category) => (
              <TabsContent key={category} value={category}>
                <ExploreContent category={category} />
              </TabsContent>
            ))}
          </Tabs>
    </div>
  )
}

/*
      <ScrollArea>
        <div className="w-full relative h-10">
          <TabsList className="flex absolute h-10">
            {tabsHeadList.map(({ id, value, label }) => (
              <TabsTrigger key={id} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    */