const { useState, useEffect } = React

export function MailFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, value, name: key } = target
        setFilterByToEdit(prev => ({ ...prev, [key]: type === 'number' ? +value : value }))
    }

    return <form className="mail-filter">
        <input
            type="text"
            name="txt"
            placeholder="subject"
            onChange={handleChange}
            value={filterByToEdit.txt} />

        <label htmlFor="readStatus">Status:</label>

        <select
            id="readStatus"
            name="readStatus"
            onChange={handleChange}
            value={filterByToEdit.readStatus}
        >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>

    </form>
}