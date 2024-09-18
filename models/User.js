const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    avatar: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
    try {
        const user = this
        if (!user.isModified('password')) return next();
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        next()
    } catch (e) {
        next(e)
    }
})

userSchema.methods.comparePassword = function (password) {
    try {
        const user = this
        return bcrypt.compareSync(password, user.password)
    } catch {
        return false;
    }
}

module.exports = mongoose.model('User', userSchema)