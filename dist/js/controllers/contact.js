import Joi from "joi";
import Message from '../models/contact.js';
const contactValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required()
});
const contactForm = async (req, res) => {
    try {
        const { error, value } = contactValidationSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const savedMessage = await Message.create(value);
        res.status(200).json({ message: 'Query sent successfully, Thank you!', query: savedMessage });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const getAllContacts = async (req, res) => {
    try {
        const allContacts = await Message.find();
        res.status(200).json({ message: 'Queries retrieved successfully!', Queries: allContacts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export { getAllContacts, contactForm };
//# sourceMappingURL=contact.js.map