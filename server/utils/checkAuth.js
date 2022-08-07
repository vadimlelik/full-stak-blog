import jwt from 'jsonwebtoken'


export const checkAuth = async (req, res, next) => {

	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (token) {

		const decode = jwt.verify(token, process.env.JWT_SECRET)

		try {

			req.userId = decode.id

			next()

		} catch (error) {
			return res.json({
				message: 'нет доступа'
			})
		}
	} else {
		return res.json({ message: 'нет доступа' })
	}

}
