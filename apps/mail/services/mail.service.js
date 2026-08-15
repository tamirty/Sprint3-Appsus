import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAILS_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                console.log('regex', regex)
                mails = mails.filter(mail => regex.test(mail.subject))
            }

            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)
            }

            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email && mail.sentAt && !mail.removedAt)
            }

            if (filterBy.status === 'trash') {
                mails = mails.filter(mail => mail.removedAt)
            }

            if (filterBy.status === 'draft') {
                mails = mails.filter(mail => !mail.sentAt)
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAILS_KEY, mail)
    } else {
        return storageService.post(MAILS_KEY, mail)
    }
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)

            const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
            const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]

            mail.nextMailId = nextMail.id
            mail.prevMailId = prevMail.id

            return mail
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1551133930500,
                subject: 'Miss you!'
                ,
                body: 'Would love to catch up sometimes'
                ,
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                createdAt: 2051133930500,
                subject: 'New Shawarma in town'
                ,
                body: 'Must try our new lafa'
                ,
                isRead: true,
                sentAt: 2051133930594,
                removedAt: null,
                from: 'bobo@bobo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                createdAt: 2551133930500,
                subject: 'The Shawarma was great'
                ,
                body: 'great reccomendation'
                ,
                isRead: true,
                sentAt: 2551133930594,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'bobo@bobo.com'
            },
            {
                id: 'e104',
                createdAt: 3051133930500,
                subject: 'I do not like Shawarma'
                ,
                body: 'i know i will be in trash folder cause i do not like Shawarma'
                ,
                isRead: true,
                sentAt: 3051133930594,
                removedAt: 3151133930594,
                from: 'shlomi@shlomo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                createdAt: 3551133930500,
                subject: 'Think again about liking Shawarma'
                ,
                body: 'it is tasty and good for you'
                ,
                isRead: true,
                sentAt: null,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'shlomi@shlomo.com'
            },
        ]
        utilService.saveToStorage(MAILS_KEY, mails)
    }
}

function getDefaultFilter() {
    return { txt: '', subject: '', status: 'inbox' }
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}