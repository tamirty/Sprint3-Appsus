const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, filterBy, onTrashMail }) {

    return <ul className="mail-list">
        {mails.map(mail => (
            <li key={mail.id}>
                <Link to={`/mail/${mail.id}`}> <MailPreview
                    mail={mail}
                    filterBy={filterBy}
                />
                </Link>
                <section className="action-btns">
                    <button onClick={() => onTrashMail(mail.id)}>x</button>
                </section>
            </li>
        )
        )}
    </ul>
}
