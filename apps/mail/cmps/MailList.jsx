const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onReadMail, filterBy, onTrashMail, onOpenDraft }) {

    return <ul className="mail-list">
        {mails.map(mail => (
            <li key={mail.id}>
                {filterBy.status === 'draft' ? (
                    <div className="mail-list-draft" onClick={() => onOpenDraft(mail)}>
                        <MailPreview mail={mail} />
                    </div>
                ) : (
                    <Link
                        to={mail.id}
                        onClick={() => onReadMail(mail.id)}>
                        <MailPreview
                            mail={mail} />
                    </Link>
                )}
                <button onClick={() => onTrashMail(mail.id)}><i className="fa-regular fa-trash-can"></i></button>
            </li>
        )
        )}
    </ul>
}
