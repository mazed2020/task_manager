import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import mongoose from 'mongoose';
import helmet from 'helmet';
import {
    CORS_CREDENTIALS,
    CORS_ORIGIN,
    MAX_JSON_SIZE, PORT,
    REQUEST_NUMBER,
    REQUEST_TIME,
    WEB_CACHE
} from "./app/config/config.js";
import {dbconnection} from "./app/db/connection.db.js";
import router from "./routes/api.js";

const app = express();

//apps configuration here all necessary configuration
app.use(cors({
    origin: CORS_ORIGIN,
    credentials:CORS_CREDENTIALS
}));
app.use(express.json({limit:MAX_JSON_SIZE }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
const limiter=rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER});
app.use(limiter);
app.set('etag', WEB_CACHE);


//http::localhost:5050/api/Registration
dbconnection();
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});

