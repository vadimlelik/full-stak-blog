import Post from '../models/Post';
import User from '../models/User'
import path, { dirname } from 'path'
import { fileURLtoPath } from 'url'

export const createPost = async (req, res) => {
	try {
		const { title, text } = req.body
		const user = await Post.findById(req.userId)

		if (req.files) {
			let fileName = Date.now().toString() + req.files.image.name
			const __dirname = dirname(fileURLtoPath(import.meta.url))
			req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

			const newPostsWithImage = new Post({
				username: user.username,
				title,
				text,
				imgUrl: fileName,
				author: req.userId

			})

			await newPostsWithImage.save()
			await User.findByIdAndUpdate(req.userId, {
				$push: { posts: newPostsWithImage }
			})

			return res.json(newPostsWithImage)
		}
		const newPostWithoutImage = new Post({
			username: user.username,
			title,
			text,
			imgUrl: ' ',
			author: req.userId
		})
		await newPostWithoutImage.save()
		await User.findByIdAndUpdate(req.userId, {
			$push: { posts: newPostWithoutImage }
		})

		return res.json(newPostWithoutImage)


	} catch (error) {
		res.json({ message: 'что-та пошло не так ' })
	}
}
