const { useState, useEffect } = React

export function MailFolderList({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() =>
        setFilterBy(filterByToEdit)
        , [filterByToEdit]
    )

    return (
        <div className="mail-folders">
            <button onClick={() => setFilterByToEdit(prev => ({ ...prev, status: 'inbox' }))}>inbox</button>
            <button onClick={() => setFilterByToEdit(prev => ({ ...prev, status: 'sent' }))}>sent</button>
            <button onClick={() => setFilterByToEdit(prev => ({ ...prev, status: 'trash' }))}>trash</button>
            <button onClick={() => setFilterByToEdit(prev => ({ ...prev, status: 'draft' }))}>draft</button>
        </div>
    )
}