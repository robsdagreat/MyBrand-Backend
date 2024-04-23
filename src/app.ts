import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRouters from './routes/blogs.js';
import userRoutes from './routes/user.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import commentRoutes from './routes/comment.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger.js';
import bodyParser from 'body-parser';
import { CommentModels } from './models/comment.js';

dotenv.config();

const app: Express = express();
app.use(cors());

const PORT: string | number = process.env.PORT || 3000;

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json());
app.use('/api', blogRouters, userRoutes, contactRoutes, adminRoutes, commentRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster10.p45jk48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10`;

mongoose.connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}, connected to the Database!`);
      console.log("type of commentModels:",typeof CommentModels);

    });
  })
  .catch((error) => {
    console.error('Error connecting to the Database:', error);
    process.exit(1);
  });

export default app;