interface ExploreNotificationProps {
    type: string
}

export const ExploreNotification = ({
    type
}: ExploreNotificationProps) => {

    let message;
    switch(type) {
        case "follow":
            message = "Follow notification"
            break;
        case "message":
            message = "Message notification"
            break;
        case "videoLike":
            message = "Video like notification"
            break;
        case "commentLike":
            message = "Comment like notification"
            break;
        case "replyLike":
            message = "Reply like notification"
            break;
        case "commentVideo":
            message = "Video comment notification"
            break;
        case "replyComment":
            message = " Reply comment notification"
            break;
        default:
            message = null
    }
    return (
        <div className="pt-16 flex items-center justify-center">
            <span>{message}</span>
        </div>
    )
}