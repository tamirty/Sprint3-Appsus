import { mailService } from "../services/mail.service.js"
import { Loader } from "../../../cmps/Loader.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

export function MailDeatails({ onTrashMail }) {

    const [mail, setMail] = useState()
    const { folder, id: mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log(err)
            )
    }, [mailId])

    function onTrash(mailId) {
        onTrashMail(mailId)
        navigate(`/mail/${folder}`)
    }

    if (!mail) return <Loader />

    return <section className="mail-details">
        <div className="mail-details-btns">
            <button onClick={() => navigate(`/mail/${folder}`)}><i className="fa-solid fa-arrow-left"></i></button>
            <button onClick={() => onTrash(mail.id)}><i className="fa-regular fa-trash-can"></i></button>
        </div>

        <h2>{mail.subject}</h2>

        <div className="mail-details-sender">
            <span className="sender-name">{mail.fullname || mail.from}</span>
            <span className="sender-email">{` <${mail.from}>`}</span>
            <p className="mail-details-date">
                {new Date(mail.sentAt).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                })}
            </p>
        </div>

        <div className="mail-details-body">{mail.body}</div>
    </section>
}