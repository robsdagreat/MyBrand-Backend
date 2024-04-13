import Joi from "joi";
import { Request, Response } from "express";
import Message from '../models/contact.js'


const contactValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required()
});


const contactForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { error, value } = contactValidationSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }
        
      const savedMessage = await Message.create(value);
      res.status(200).json({ message: 'Query sent successfully, Thank you!', query: savedMessage });
    } catch (error) {      
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

export default contactForm;
