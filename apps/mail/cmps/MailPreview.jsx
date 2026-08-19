export function MailPreview({ mail, filterBy }) {
    return (
        <article className="mail-preview">
            <span className={mail.isRead ? "" : "unread"}>{mail.fullname}</span>
            <p className={mail.isRead ? "" : "unread"}>{mail.subject} - <span className="span-body">{mail.body}</span></p>
            <p>{new Date (mail.sentAt).toLocaleDateString('en-GB', {month:'short',day:'numeric'})}</p>
        </article>
    )
}
