const { useState, useEffect } = React
const { useParams } = ReactRouter


import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailPreview } from "../cmps/MailPreview.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailDeatails } from "./MailDetails.jsx"


export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [mailToEdit, setMailToEdit] = useState(null)
    const { id: mailId } = useParams()
    const { folder } = useParams()

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        return mailService.query(filterBy)
            .then(mails => setMails(mails))
    }

    useEffect(() => {
        setFilterBy(prev => ({
            ...prev, status: folder
        }))
    }, [folder])

    function onTrashMail(mailId) {
        if (folder === 'trash') return onRemoveMail(mailId)

        const currMail = mails.find(mail => mail.id === mailId)

        const mailToTrash = {
            ...currMail,
            removedAt: Date.now()
        }
        mailService.save(mailToTrash)
            .then(() => {
                setMails(prev => prev.filter(mail => mail.id !== mailId))
            })
    }

    function onReadMail(mailId) {
        const currMail = mails.find(mail => mail.id === mailId)

        const MailStatusRead = {
            ...currMail,
            isRead: true
        }
        mailService.save(MailStatusRead)
            .then(() => {
                setMails(prev => prev.map(mail => {
                    if (mail.id === mailId) return MailStatusRead
                    return mail
                }))
            })
    }

    function onOpenDraft(mail) {
        setMailToEdit(mail)
        setIsComposeOpen(true)
    }

    function onRemoveMail(mailId) {
        return mailService.remove(mailId)
            .then(() => {
                setMails(prev => prev.filter(mail => mail.id !== mailId))
            })
    }

    return (
        <section className="mail-index">

            <div className="side-bar">
                <button onClick={() => setIsComposeOpen(true)}>
                    <span className="compose-btn-text">Compose</span>
                    <i className="fa-solid fa-pen compose-btn-icon"></i>
                    </button>
                <MailFolderList
                    filterBy={filterBy}
                    setFilterBy={setFilterBy} />
            </div>

            <div className="inner-index">
                <MailFilter
                    filterBy={filterBy}
                    setFilterBy={setFilterBy} />

                {!mailId && <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                    filterBy={filterBy}
                    onTrashMail={onTrashMail}
                    onReadMail={onReadMail}
                    onOpenDraft={onOpenDraft} />
                }

                {mailId && <MailDeatails
                    onTrashMail={onTrashMail} />
                }

                {isComposeOpen && <MailCompose
                    mailToEdit={mailToEdit}
                    loadMails={loadMails}
                    onClose={() => {
                        setIsComposeOpen(false)
                        setMailToEdit(null)
                    }} />
                }
            </div>

        </section>
    )
}

