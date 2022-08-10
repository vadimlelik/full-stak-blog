import { Router } from 'express'
import { createPost, getAll } from '../controllers/post.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

// create post
router.post('/', checkAuth, createPost)
// get all post


router.get("/", getAll)

export default router