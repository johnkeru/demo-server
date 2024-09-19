const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ field: 'username', message: 'User not found!' })
        if (!user.comparePassword(password)) return res.status(404).json({ field: 'password', message: 'Incorrect password!' })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SIGNATURE, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.json({ field: 'username', message: 'Server error' })
    }
}

exports.register = async (req, res) => {
    try {
        const body = req.body
        let newUser = new User(body)
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SIGNATURE, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        console.log(error)
        res.json({ field: 'username', message: 'Server error' })
    }
}

exports.currentUser = async (req, res) => {
    const userId = req.userId
    const user = await User.findById(userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found!' })
    res.json({ user })
}

exports.getAllUsers = async (req, res) => {
    try {
        const userId = req.userId
        const users = await User.find({ _id: { $ne: userId } }).select('-password')
        res.json({ users })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Server error' })
    }
}