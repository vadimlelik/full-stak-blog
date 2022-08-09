import { Router } from 'express'
import { createPost } from '../controllers/post'

const router = new Router()



router.post('/', checkAuth, createPost)



export default router
