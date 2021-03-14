import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const TrainModel = new Schema({
    train_name: { type: String, default: "",unique : true },
    train_number: { type: String, default: "", unique:true },
    start_point :{ type: String, default: "" },
    end_point :{ type: String, default: "" },
    total_seats :{ type: Number, default: 10 },
    from_time: { type: String, default: "", },
    to_time: { type: String, default: "", },
    cost : {type : Number, default:200},
    train_status :{ type: Boolean, default:true },
    created_at: { type: Date, default: Date.now }
});
export const Train = mongoose.model('train', TrainModel);


