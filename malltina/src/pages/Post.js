import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { GetComments, GetPost } from '../api/post-api';
import Comment from '../components/Comment';

import img_banner from '../assrets/bitmap.jpg'
import img_comment from '../assrets/comment_avatar.jpg'

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [isLoadingPost, setIsLoadingPost] = useState(false)
    const [isLoadingComments, setIsLoadingComments] = useState(false)

    useEffect(() => {
        setIsLoadingComments(true)
        setIsLoadingPost(true)

        //get post data
        GetPost(id).then(response => {
            setPost(response.data)
            setIsLoadingPost(false)
        });

        GetComments(id).then(response => {
            setComments(response.data)
            setIsLoadingComments(false)
        })

    }, [])
    return (
        <div>

            {isLoadingPost ?
                <center>please wait to load post info...</center>
                :
                <div className='text-center'>
                    <img src={img_banner} alt='banner' />
                    <h2>{post?.title}</h2>
                </div>
            }

            <hr />

            {isLoadingComments ?
                <center>please wait to load comments...</center>
                :
                comments.map((each, index) =>
                    <Comment
                        className="my-3"
                        key={index}
                        src_img={img_comment}
                        {...each} />
                )
            }

        </div>
    )
}

export default Post;