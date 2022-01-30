import mongoose, { Schema } from 'mongoose';


const UrlSchema = new mongoose.Schema({
    originURL: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
})
export default UrlSchema;