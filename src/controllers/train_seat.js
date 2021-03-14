import { TrainSeats } from "../models/TrainSeatsSchema"

export const createTrainSeats = async (train) => {
    try {
        for (let index = 1; index <= train.total_seats; index++) {
            let createObj = { train: train._id, seat_name: `T${index}` };
            let trainSeat = await new TrainSeats(createObj)
            await trainSeat.save();
        }
        return true
    } catch (error) {
        throw "Error while creating seat for train"
    }
}

export const getTrainSeatByTrain = async (train_id) => {
    try {
        let seats = await TrainSeats.find({ train: train_id }).lean();
        return seats;
    } catch (error) {
        throw "Error while getting seat for train"
    }
}