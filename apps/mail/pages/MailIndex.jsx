const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailPreview } from "../cmps/MailPreview.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    console.log(filterBy);


    useEffect(() => {
        loadMails()
    }, [filterBy])


    function loadMails() {
        return mailService.query(filterBy)
            .then(mails => setMails(mails))
    }

    // console.log(mails);
    return <section className="mail-index">
        <MailFolderList
            filterBy={filterBy}
            setFilterBy={setFilterBy}
        />

        <MailList
            mails={mails} />

    </section>
}

