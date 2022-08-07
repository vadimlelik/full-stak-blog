import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// registration user



export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
                message: 'Данный username уже занят.',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })


        await newUser.save()

        res.json({
            newUser,
            message: 'Регистрация прошла успешно.',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя.' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
                message: 'Такого юзера не существует'
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.json({ message: 'Не верный пароль ' })
        }

        const token = jwt.sign({
            id: user._id

        }, process.env.JWT_SECRET, { expiresIn: '30d' })


        res.json({
            token, user, message: 'вы вошли в систему '
        })

    } catch (error) {
        res.json({ message: 'Ошибка при входе в  систему' })
    }
}
export const getMe = async (req, res) => {
    try {

        const user = await User.findOne(req.userId)

        if (!user) {
            return res.json({ messahe: ' такого юзера не существует' })
        }

        const token = jwt.sign({
            id: user._id

        }, process.env.JWT_SECRET, { expiresIn: '30d' })


        res.json({
            token, user, message: 'вы вошли в систему '
        })


    } catch (error) {
        res.json({
            message: 'нет доступа'
        })
    }
}