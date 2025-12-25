
export const validateMessage = (req, res, next) => {
    const { content } = req.body;

    // 1. Check if content exists
    if (content === undefined || content === null) {
        return res.status(400).json({ success: false, message: "Message content is required." });
    }

    // 2. Ensure it is a string
    if (typeof content !== 'string') {
        return res.status(400).json({ success: false, message: "Message content must be a string." });
    }

    // 3. Trim whitespace and check if it's empty
    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
        return res.status(400).json({ success: false, message: "Cannot send an empty message." });
    }

    // 4. Set a character limit
    if (trimmedContent.length > 5000) {
        return res.status(400).json({ success: false, message: "Message is too long (max 5000 characters)." });
    }

    req.body.content = trimmedContent;

    next();
};
