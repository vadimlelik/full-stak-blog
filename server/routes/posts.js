import { Router } from 'express'
import { createPost, getAll, getById, getMyPosts } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// create post
router.post('/', checkAuth, createPost)

// get all post
router.get("/", getAll)

// get postByid
router.get('/:id', getById)


// get postByid
router.get('/user/me', checkAuth, getMyPosts)

export default router