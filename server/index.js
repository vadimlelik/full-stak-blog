import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'




const app = express()
dotenv.config()
const PORT = process.env.PORT || 3002
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME


// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


// routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const start = async () => {

	try {
		await mongoose.connect(`mongodb://uuhsp2topvafndfuytz4:GByuKzlVVWL4mMdh563L@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/beldax5zxphvgy2?replicaSet=rs0`)

		app.listen(PORT || 3002, () => {
			console.log(`server started port ${PORT}`);
		})

	} catch (error) {
		console.log(error);
	}

}



start()