import { MainComment } from "@/app/components/comment/MainComment"
import { Replies } from "@/app/components/comment/Replies"
import { ReplyInput } from "@/app/components/comment/ReplyInput"

interface CommentPageProps {
    params: {
        commentId: string
    }
}

export default function CommentPage({
    params
}: CommentPageProps) {
    return (
        <div className="h-screen p-4 flex justify-center">
            <div className="max-w-[600px] flex flex-col items-center size-full">
                <div className="flex w-full">
                    <MainComment commentId={params.commentId} /> 
                </div>
                <div className="flex flex-1 w-full overflow-auto">
                    <Replies commentId={params.commentId} />
                </div>
                <div className="flex w-full">
                    <ReplyInput commentId={params.commentId} />
                </div>
            </div>
        </div>
    )
}