import express, {Express} from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import blogRouter from './routes/blogs.js'
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger.js';




dotenv.config();


const app: Express= express();
app.use(cors());
   
const PORT: string | number = 3000;

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())
app.use(express.urlencoded({extended: true}))


     
     

app.use("/api", blogRouter);
 
      

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster10.p45jk48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10`

mongoose.connect(uri).then(()=>{
    app.listen(PORT, ()=>{
        
        console.log(`Server running on port: ${PORT}, connected to MongoDB`);
    })
}).catch(error=>{
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
}); 



export default app