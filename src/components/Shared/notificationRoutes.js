const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const verifyToken = require('../middleware/verifyToken');

// Get notifications by email
router.get('/:email', verifyToken, async (req, res) => {
    try {
        const notifications = await Notification.find({ toEmail: req.params.email })
            .sort({ time: -1 })
            .limit(50);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mark all notifications as read
router.patch('/mark-read/:email', verifyToken, async (req, res) => {
    try {
        await Notification.updateMany(
            { toEmail: req.params.email, isRead: false },
            { isRead: true }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete notification
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;