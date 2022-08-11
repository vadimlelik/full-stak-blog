import { Router } from 'express'
import { createPost, getAll, getPostsById } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// create post
router.post('/', checkAuth, createPost)

// get all post
router.get("/", getAll)


router.get('/:id', getPostsById)

export default router