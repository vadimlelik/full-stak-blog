import { Router } from 'express'
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// create post
router.post('/', checkAuth, createPost)

// get all post
router.get("/", getAll)

// get postByid
router.get('/:id', getById)


// get  posts user me
router.get('/user/me', checkAuth, getMyPosts)

// get postByid
router.delete('/:id', checkAuth, removePost)

// get updatePost
router.put('/:id', checkAuth, updatePost)

// get posts comment
router.get('/comments/:id', getPostComments)




export default router