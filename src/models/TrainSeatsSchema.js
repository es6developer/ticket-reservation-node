import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const TrainSeatsModel = new Schema({
    seat_name: { type: String, default: "", },
    status: { type: Boolean, default: true,  },
    train :{ type: ObjectId, ref: "train" },
    created_at: { type: Date, default: Date.now }
});
export const TrainSeats = mongoose.model('train_seat', TrainSeatsModel);

