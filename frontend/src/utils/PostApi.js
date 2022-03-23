import axios from 'axios';


export async function editPost(formData, token, postId){
    try {
        let response = await axios.put(`http://127.0.0.1:8000/api/forum_posts/user/editpost/${postId}/`, formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}


export async function createNewPost(formData, token){
    try {
        let response = await axios.post('http://127.0.0.1:8000/api/forum_posts/user/posts/', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}