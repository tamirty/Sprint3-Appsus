export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <h3>{mail.from}</h3>
            <p>{mail.subject}</p>
            <p>{new Date (mail.sentAt).toLocaleDateString('en-GB', {month:'short',day:'numeric'})}</p>
        </article>
    )
}
