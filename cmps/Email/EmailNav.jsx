
const { NavLink } = ReactRouterDOM
import { eventBusService } from '../../services/event-bus-service.js'
import { emailService } from '../../services/Email/email.service.js'

export class EmailNav extends React.Component {
    // const updateSelectedFilter = (value) => {
    //     eventBusService.emit('mailFilter', value)
    // }
    state = {
        count: 0
    }

    componentDidMount() {
        eventBusService.on('unReadCount', (value) => {
            const count = (this.state.count + value >= 0) ? this.state.count + value : 0
            this.setState({ count })
        })
        this.setState({ count: emailService.getUnreadEmailsCount() })
    }

    render() {
        const { count } = this.state
        return (
            <nav>
                <ul className="email-side-nav clean-list flex align-items">
                    <NavLink activeClassName="active-nav-email" className="compus-mail" onClick={this.props.toggleCompose}><i className="fas fa-plus"></i>Compose</NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', ['isRead']: null, ['isStar']: null, status: 'inbox' }) }} to={`/email/inbox`}><i className="fas fa-inbox"></i>Inbox</NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', status: 'sent' }) }} to={`/email/sent`}><i className="far fa-paper-plane"></i>Sent</NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', ['isRead']: true }) }} to={`/email/read`}><i className="fas fa-sign-out-alt"></i>Read</NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', ['isRead']: false }) }} to={`/email/unread`}><i className="fas fa-envelope-open"></i>UnRead <span>{count}</span></NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', ['isStar']: true }) }} to={`/email/star`}><i className="fa fa-star"></i>Star</NavLink>
                    <NavLink activeClassName="active-nav-email" onClick={() => { this.props.onSetFilter({ ['text']: '', status: 'trash' }) }} to={`/email/trash`}><i className="fa fa-trash"></i>Trash</NavLink>
                </ul>
            </nav>
        )
    }
}
