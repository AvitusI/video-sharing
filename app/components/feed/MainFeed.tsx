"use client";

import { useEffect, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getFeed } from "@/app/actions/feed.actions";
import { FeedVideo } from "./FeedVideo";

const fetchFeed = async ({ pageParam }: { pageParam: number}) => {
    const response = await getFeed({ page: pageParam })
    return response;
}

interface MainFeedProps {
    userId: string
}

export const MainFeed = ({
    userId
}: MainFeedProps) => {

    const { ref, inView } = useInView()

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["feed"],
        queryFn: fetchFeed,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined
    })
    // @ts-expect-error // throw
    console.log(JSON.stringify(data?.pages[0]?.items[0].video.likes, null, " "))

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    return (
        <div className="pt-16 h-screen overflow-y-scroll snap-y snap-mandatory">
            {data?.pages.map((page, i) => {
                return (
                    <Fragment key={i}>
                        {page?.items?.length && 
                            page?.items?.length > 0 ? page.items?.map((video) => {
                                return (
                                    <section key={video.video.id} className="snap-start flex items-center justify-center h-screen">
                                        <FeedVideo
                                            id={video.video.id}
                                            name={video.video.user.username}
                                            avatar={video.video.user.profilePictureUrl!}
                                            src={video.video.url}
                                            likes={video.video.likes}
                                            userId={userId}
                                        />
                                    </section>
                                )
                            }) : (
                                <div className="h-full w-full flex items-center justify-center">
                                    <p>We are populating your feed</p>
                                </div>
                            )
                        }
                    </Fragment>
                )
            })}

            <div ref={ref} className="flex justify-center items-center">
                {isFetchingNextPage && <p>Loading...</p>}
            </div>
        </div>
    )
}