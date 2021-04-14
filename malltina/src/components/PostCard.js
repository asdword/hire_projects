import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardImg, CardBody, CardSubtitle } from 'reactstrap'
import { Link } from 'react-router-dom'

function PostCard({ id, className, title, src_img }) {

    return (
        <Card className={className}>
            <Link to={'/post/' + id}>
                <CardImg top width="100%" src={src_img} alt="image" />
                <CardBody>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{title}</CardSubtitle>
                </CardBody>
            </Link>
        </Card>
    )
}

PostCard.propTypes = {

    src_img: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default PostCard

