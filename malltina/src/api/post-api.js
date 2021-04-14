import Axios from 'axios'
const SERVER_URL = 'https://jsonplaceholder.typicode.com/'

const GetPosts = () =>
    Axios.get(SERVER_URL + 'posts')

const GetPost = (postId) =>
    Axios.get(SERVER_URL + 'posts/' + postId)

const GetComments = (postId) =>
    Axios.get(SERVER_URL + 'comments?postId=' + postId)



export { GetPosts, GetComments, GetPost }

