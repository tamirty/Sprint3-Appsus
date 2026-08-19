import { mailService } from "../services/mail.service.js"

const { useState } = React

export function MailCompose({ loadMails, onClose }) {
    const [mail, setMail] = useState(mailService.getEmptyMail())

    function handleChange({ target }) {
        const { type, value, name: key } = target
        setMail(prev => ({ ...prev, [key]: type === 'number' ? +value : value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()

        const mailTosave = {
            ...mail,
            sentAt: Date.now()
        }

        mailService.save(mailTosave)
            .then(mail => {
                console.log('saved with id', mail.id);
                loadMails()
                onClose()
            })
    }

    return <form onSubmit={onSendMail} className="mail-form">
        <div className="form-header">
            <h3>New Message</h3>
            <button type="button" className="close-btn" onClick={onClose}>X</button>
        </div>

        <div className="form-field">
            <input
                value={mail.to}
                onChange={handleChange}
                id="to"
                name="to"
                type="email"
                placeholder="To" />
        </div>

        <div className="form-field">
            <input
                value={mail.subject}
                onChange={handleChange}
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject" />
        </div>

        <textarea
            value={mail.body}
            onChange={handleChange}
            id="body"
            name="body"
            type="text" />

        <button className="send-btn">Send</button>
    </form>
}