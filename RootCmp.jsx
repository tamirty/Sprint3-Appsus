const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { BookIndex } from './apps/missbooks/pages/BookIndex.jsx'
import { BookDetails } from './apps/missbooks/pages/BookDetails.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:folder" element={<MailIndex />} />
                <Route path="/mail/:folder/:id" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:id" element={<BookDetails />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
