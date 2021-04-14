import PropTypes from 'prop-types'
import { Media } from 'reactstrap'


function Comment({ id, name, className, body, email, src_img }) {
    return (
        <Media className={className}>
            <Media left href="#" className='mx-2'>
                <Media object src={src_img} alt="avatar" />
            </Media>
            <Media body>
                <Media heading>
                    {name}
                </Media>
                <a href={'mailto:'+email} >{email}</a>
                <p>
                    {body}
                </p>
            </Media>
        </Media>
    )
}

Comment.propTypes = {
    id: PropTypes.number,
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    className: PropTypes.string,
    src_img: PropTypes.string
}

export default Comment

