import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAILS_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
	get,
	remove,
	save,
}

function query(filterBy = {}) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                console.log('regex', regex)
                mails = mails.filter(mail => regex.test(mail.subject))
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
        ]
        		utilService.saveToStorage(MAILS_KEY, mails)
    }
}
