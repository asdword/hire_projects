import { useState, useEffect } from 'react'
import { Alert } from 'reactstrap'
import { GetPosts } from '../api/post-api'

import logo from '../assrets/avatar.svg'
import PostCard from '../components/PostCard'
import img_card from '../assrets/bitmap.jpg'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        setIsLoading(true);

        //get all post
        GetPosts().then(response => {
            setPosts(response.data);
            setIsLoading(false);
        })

    }, [])


    return (
        <>
            <div className='row rtl'>

                <Alert color="warning">
                    <img src={logo} className="mr-2" />
                    تغییر وضعیت کالا ممکن هست با تاخیر انجام گردد اما مراحل خرید و ارسال  طبق زمان تخمینی اعلام شده انجام خواهد شد.
                </Alert>

            </div>



            <div className='row'>
            
                {isLoading ?
                    <h5 >please wait...</h5>
                    :
                    posts?.map((each, index) =>

                        <PostCard
                            src_img={img_card}
                            className='col-md-3 rounded-0'
                            key={index}
                            id={each.id}
                            title={each.title} />
                    )}
            
            </div>

        </>
    )
}
