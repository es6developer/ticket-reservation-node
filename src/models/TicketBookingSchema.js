import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
const TicketBookingModel = new Schema({
    train: { type: ObjectId, ref: "train", },
    user: { type: ObjectId, ref: "user", },
    seats :[{ type : ObjectId, ref: 'train_seat' }],
    date: { type: String, default: "", },
    total_cost : {type : Number, default:0},
    ticket_status: { type: String, default: "Booked",},
    created_at: { type: Date, default: Date.now }
});
export const TicketBooking = mongoose.model('ticket_booking', TicketBookingModel);

