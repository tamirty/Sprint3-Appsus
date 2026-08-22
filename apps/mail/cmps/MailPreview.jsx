const { useParams } = ReactRouter

export function MailPreview({ mail}) {
    const {folder} = useParams()
    return (
        <article className="mail-preview">
            <span className={mail.isRead ? "" : "unread"}>{folder==='sent' ? (`To: ${mail.to}`) : (mail.fullname || mail.to)}</span>
            <p className={mail.isRead ? "" : "unread"}>{mail.subject} - <span className="span-body">{mail.body}</span></p>
            <p>{new Date (mail.sentAt).toLocaleDateString('en-GB', {month:'short',day:'numeric'})}</p>
        </article>
    )
}
