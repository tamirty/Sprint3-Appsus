const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"


export function MailIndex() {

const [mails, setMails] = useState([])

useEffect(() => {
    loadMails()
},[])


function loadMails() {
    return mailService.query()
    .then(mails => setMails(mails))
}

// console.log(mails);
    return <section className="container">
        <MailList
        mails={mails} />

    </section>
}

