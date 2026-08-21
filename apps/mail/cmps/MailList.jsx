const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onReadMail, filterBy, onTrashMail }) {

    return <ul className="mail-list">
        {mails.map(mail => (
            <li key={mail.id}>
                <Link
                    to={mail.id}
                    onClick={() => onReadMail(mail.id)}>
                    <MailPreview
                        mail={mail}
                        filterBy={filterBy} />
                </Link>
                <button onClick={() => onTrashMail(mail.id)}><i className="fa-regular fa-trash-can"></i></button>
            </li>
        )
        )}
    </ul>
}
