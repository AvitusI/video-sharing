import { getComment } from "@/app/actions/comment.actions"
import { Comment } from "../video/Comment"

interface MainCommentProps {
    commentId: string
}

export const MainComment = async ({
    commentId
}: MainCommentProps) => {

    const { comment } = await getComment(commentId)

    if (!comment) {
        return (
            <div className="flex items-center justify-center size-full">
                <span>Comment not found</span>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Comment
                id={comment.id}
                name={comment.user.username}
                time={comment.createdAt.toString().substring(0, 24)}
                avatar={comment.user.profilePictureUrl!}
                content={comment.content}
                likes={comment.likes}
            />
        </div>
    )
}