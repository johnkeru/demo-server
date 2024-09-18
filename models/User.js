const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    avatar: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function (next) { // this is middleware or basically handling save before the actual save to the database
    try {
        const user = this
        if (!user.isModified('password')) return next(); // only hash the password if new user or user change the password
        const hashedPassword = await bcrypt.hash(user.password, 10) // hash the pass: ex. from pass to 322fafawe3w3fwe something that we dont understand
        user.password = hashedPassword // then after set the hashed password to the password in user
        next() // next is a function that say that everything is good so the next handler or actual saving to the db 
    } catch (e) {
        next(e) // pass the error to next handler
    }
})

userSchema.methods.comparePassword = function (password) { // use in login to compare user input password to the hashed password
    try {
        const user = this
        return bcrypt.compareSync(password, user.password)
    } catch {
        return false;
    }
}

module.exports = mongoose.model('User', userSchema)