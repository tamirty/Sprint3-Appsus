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
    getEmptyMail,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'User Appsus'
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

            if (filterBy.readStatus === 'read') {
                mails = mails.filter(mail => mail.isRead)
            }

            if (filterBy.readStatus === 'unread') {
                mails = mails.filter(mail => !mail.isRead)
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
                id: utilService.makeId(),
                createdAt: 1551133930500,
                subject: 'Miss you!'
                ,
                body: 'Would love to catch up sometimes'
                ,
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Momo Shlomo'
            },
            _createMail(1551133930500, 'Project meeting', 'The project meeting has been moved to Monday at 10:00 AM.', false, 1551133930594, null, 'daniel@company.com', 'user@appsus.com', 'Daniel Cohen'),
            _createMail(1651133930500, 'Invoice for August', 'Please review the attached invoice for August. Payment is due by the end of the month.', true, 1651133930594, null, 'rachel@finance.com', 'user@appsus.com', 'Rachel Green'),
            _createMail(1751133930500, 'Appointment confirmation', 'Your appointment has been confirmed for Thursday at 14:30.', false, 1751133930594, null, 'sarah@clinic.com', 'user@appsus.com', 'Sarah Levi'),
            _createMail(1781133930500, 'Security alert', 'A new login to your account was detected. Please review your recent account activity.', false, 1781133930594, null, 'security@service.com', 'user@appsus.com', 'Security Team'),
            _createMail(1782133930500, 'Updated work schedule', 'The updated work schedule for next week is now available.', true, 1782133930594, null, 'michael@company.com', 'user@appsus.com', 'Michael Rosen'),
            _createMail(1783133930500, 'Application received', 'We have received your application and will contact you after it has been reviewed.', true, 1783133930594, null, 'emma@recruitment.com', 'user@appsus.com', 'Emma Wilson'),
            _createMail(1784133930500, 'Document approval required', 'Please review and approve the updated document before Friday afternoon.', false, 1784133930594, null, 'jonathan@company.com', 'user@appsus.com', 'Jonathan Miller'),
            _createMail(1785133930500, 'Account verification', 'Please verify your email address to complete your account registration.', false, 1785133930594, null, 'accounts@service.com', 'user@appsus.com', 'Accounts Team'),
            _createMail(1785233930500, 'Meeting follow-up', 'Thank you for today’s meeting. I have summarized the main action items we discussed.', true, 1785233930594, null, undefined, 'david@company.com', 'User Appsus'),
            _createMail(1785333930500, 'Requested documents', 'I am sending the documents you requested during our previous conversation.', true, 1785333930594, null, undefined, 'office@company.com', 'User Appsus'),
            _createMail(1785433930500, 'Project status update', 'The first stage of the project has been completed. We are now preparing for the next phase.', true, 1785433930594, null, undefined, 'team@company.com', 'User Appsus'),
            _createMail(1785533930500, 'Meeting availability', 'I am available on Tuesday or Wednesday afternoon. Please let me know which time works for you.', false, 1785533930594, null, undefined, 'sarah@company.com', 'User Appsus'),
            _createMail(1785633930500, 'Contract review', 'I reviewed the contract and added my comments. Please review the proposed changes.', true, 1785633930594, null, undefined, 'legal@company.com', 'User Appsus'),
            _createMail(1785733930500, 'Draft proposal', 'I have prepared the initial proposal and will complete the remaining sections tomorrow.', false, null, null, undefined, 'client@business.com', 'User Appsus'),
            _createMail(1785833930500, 'Budget discussion', 'I would like to discuss the proposed budget before submitting the final version.', false, null, null, undefined, 'finance@company.com', 'User Appsus'),
            _createMail(1785933930500, 'Training registration', 'Your registration for the professional training course has been completed successfully.', true, 1785933930594, null, 'emily@academy.com', 'user@appsus.com', 'Emily Brooks'),
            _createMail(1786033930500, 'System maintenance notice', 'The system will be temporarily unavailable on Sunday between 02:00 and 04:00.', false, 1786033930594, null, 'support@service.com', 'user@appsus.com', 'Technical Support'),
            _createMail(1786133930500, 'Delivery confirmation', 'Your order has been shipped and is expected to arrive within three business days.', true, 1786133930594, null, 'james@shipping.com', 'user@appsus.com', 'James Parker'),
            _createMail(1786233930500, 'Request for additional information', 'We need additional information before we can continue processing your request.', false, 1786233930594, 1786333930594, 'olivia@company.com', 'user@appsus.com', 'Olivia Martin'),
            _createMail(1786333930500, 'Cancelled appointment', 'Your appointment scheduled for next week has been cancelled. Please contact us to arrange another date.', true, 1786333930594, 1786433930594, 'appointments@clinic.com', 'user@appsus.com', 'Dr. Sophia Brown')

        ]
    }
    utilService.saveToStorage(MAILS_KEY, mails)
}

function _createMail(createdAt, subject, body, isRead, sentAt, removedAt, from = 'user@appsus.com', to, fullname) {
    return {
        id: utilService.makeId(),
        createdAt,
        subject,
        body,
        isRead,
        sentAt,
        removedAt,
        from,
        to,
        fullname,
    }
}

function getEmptyMail() {
    return {
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        fullname:'User Appsus'
    }
}

function getDefaultFilter() {
    return { txt: '', subject: '', status: 'inbox', readStatus: 'all' }
}

