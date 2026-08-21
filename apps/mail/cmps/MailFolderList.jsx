const { Link, NavLink } = ReactRouterDOM

export function MailFolderList() {

    return (
        <div className="mail-folders">
            <NavLink to="/mail/inbox">
                <button>Inbox</button>
            </NavLink>

            <NavLink to="/mail/sent">
                <button>Sent</button>
            </NavLink>

            <NavLink to="/mail/trash">
                <button>Trash</button>
            </NavLink>

            <NavLink to="/mail/draft">
                <button>Draft</button>
            </NavLink>
        </div>
    )
}