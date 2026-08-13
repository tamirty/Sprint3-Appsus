export function MailPreview({ mail }) {
    return (
        <article>
            <h2>Subject: {mail.subject}</h2>
            <h3>From: {mail.from}</h3>
            <p>{mail.body}</p>
        </article>
    )
}
