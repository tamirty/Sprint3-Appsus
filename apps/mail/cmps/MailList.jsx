import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    return <div className="mail-list">
        {mails.map(mail => (
            <article key={mail.id}>
                <MailPreview mail={mail} />
            </article>
        )
        )}
    </div>
}
