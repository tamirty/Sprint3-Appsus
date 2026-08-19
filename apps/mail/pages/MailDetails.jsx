import { mailService } from "../services/mail.service.js"
import { Loader } from "../../../cmps/Loader.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

export function MailDeatails() {

    const [mail, setMail] = useState()
    const { id: mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log(err)
            )
    }, [mailId])

    if (!mail) return <Loader />

    return <section className="mail-details">
        <div className="mail-details-btns">
            <button onClick={() => onRemoveMail(mail.id)}>x</button>
            <button onClick={() => navigate('/mail')}>Back</button>
        </div>
        <h2>{mail.subject}</h2>
        <span>{mail.from}</span>
        <span>{mail.body}</span>
    </section>
}