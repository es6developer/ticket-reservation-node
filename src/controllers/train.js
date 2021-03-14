import { Train } from "../models/TrainSchema";
import { getSeatBookingDetails } from "./booking";
import { createTrainSeats, getTrainSeatByTrain } from "./train_seat";

export const createTrain = async (req, res) => {
    try {
        let train = new Train(req.body)
        await train.save();
        await createTrainSeats(train);
        res.sendResponse({ train }, 'Train Added - success', 200)
    } catch (error) {
        res.sendError({ error }, 'Something went wrong!', 500);
    }
}

export const updateTrain = async (req, res) => {
    try {
        Train.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true },
            (error, response) => {
                if (error) res.sendError({ error }, 'Failed to update train', 500);
                else {
                    res.sendResponse({ response }, 'Train update - success', 200)
                }
            }
        )
    } catch (error) {
        res.sendError({ error }, 'Failed to update train', 500);
    }
}

export const deleteTrain = (req, res) => {
    try {
        Train.deleteOne({ _id: req.params.id }).exec((error, response) => {
            if (error) res.sendError({ error }, 'Failed to delete train', 500);
            else {
                res.sendResponse({ response }, 'Train delete - success', 200)
            }
        })
    } catch (error) {
        res.sendError({ error }, 'Failed to delete train', 500);
    }


}

export const getAllTrains = (req, res) => {
    try {
        Train.find((error, response) => {
            if (error) res.sendError({ error }, 'Failed to get trains', 500);
            else {
                res.sendResponse({ response }, 'Train Get - success', 200)
            }
        })
    } catch (error) {
        res.sendError({ error }, 'Failed to get trains', 500);
    }
}

export const getTrainByStartAndEndPoint = async (req, res) => {
    try {
        let trainsList = await Train.find({
            $and: [
                { start_point: req.body.start_point },
                { end_point: req.body.end_point }
            ]
        });
        res.sendResponse(trainsList, 'Train Get - success', 200)
    } catch (error) {
        res.sendError({ error }, 'Failed to get trains', 500);
    }
}

export const getTrainDetailsWithSeat = async (req, res) => {
    try {
        let train = await Train.findOne({ _id: req.body.id });
        let seats = await getTrainSeatByTrain(train._id);
        for (const seat of seats) {
            seat.isSelected = false; // for UI
            seat.isBooked = await getSeatBookingDetails(train, seat, req)
        }
        res.sendResponse({ train, seats }, 'get train details - success', 200)

    } catch (error) {
        res.sendError({ error }, 'Failed to get train details', 500);
    }
}

export const getStartAndEndPoint = async (req, res) => {
    try {
        let searchText = req.query.text;
        let startpoint = req.query.startpoint
        let data;
        if (req.query.type == "start") {
            data = await Train.distinct("start_point", { start_point: { $regex: searchText, $options: 'i' } })
        }
        if (req.query.type == "end") {
            data = await Train.distinct("end_point", {
                $and: [
                    { end_point: { $regex: searchText, $options: "i" } },
                    { end_point: { $ne: startpoint } }

                ]
            });
        }
        res.sendResponse(data, 'Start and Endpoint autocomplete- success', 200)
    } catch (error) {
        console.log("error", error);
        res.sendError(error, 'Failed to get start and endpoints', 500);
    }

}