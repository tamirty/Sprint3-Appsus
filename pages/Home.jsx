import { showSuccessMsg } from '../services/event-bus.service.js'

const { Link } = ReactRouterDOM

export function Home() {
    return <section className="container home">
        <div className="box-container">
            <Link className="app-card" to="/mail">
                <img className="app-logo" src="assets/img/appsus-mail-logo.png" alt="Appsus Mail" />
            </Link>            
            <Link className="app-card" to="/note">
                <img className="app-logo" src="assets/img/appsus-note-logo.png" alt="Appsus Mail" />
            </Link>            
            <Link className="app-card" to="/book">
                <img className="app-logo-book" src="assets/img/appsus-book-logo.png" alt="Appsus Mail" />
            </Link>            
        </div>
    </section>
}