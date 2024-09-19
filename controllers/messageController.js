const Message = require('../models/Message')
exports.getMessages = async (req, res) => {
    try {
        const yourId = req.params.yourId
        const otherId = req.params.otherId
        let messages = [];
        messages = await Message.find({
            $or: [
                { sender: yourId, receiver: otherId },
                { sender: otherId, receiver: yourId },
            ]
        })
        res.json({ messages })
    } catch {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}