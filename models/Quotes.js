import mongoose from "mongoose";

const quotesSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    }
})

const QuotesModal = mongoose.model('QuotesModal', quotesSchema);

export default QuotesModal;