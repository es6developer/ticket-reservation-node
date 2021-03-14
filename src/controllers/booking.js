import { TicketBooking } from "../models/TicketBookingSchema"

export const bookTicket = async (req, res) => {
    try {

        let book = await new TicketBooking(req.body);
        await book.save();
        if (!book) {
            return res.sendError({}, 'Error while booking ticket', 500);
        }
        res.sendResponse({ book }, 'Ticket Booked - success', 200)
    } catch (error) {
        res.sendError({ error }, 'Something went wrong!, Please try again', 500);
    }
}

export const cancelTicket = async (req, res) => {
    try {
        let body = { ticket_status: "Cancelled" }
        let ticket = await TicketBooking.findOneAndUpdate(
            { _id: req.params.id },
            { $set: body },
            { new: true });
        if (!ticket) {
            return res.sendError({}, 'Error while cancelling ticket', 500);
        }
        res.sendResponse({ ticket }, 'Your ticket has been cancelled.', 200)
    } catch (error) {
        res.sendError({ error }, 'Something went wrong!, Please try again', 500);
    }
}

export const getTicketsByUser = async (req, res) => {
    try {
        let match = {};
        let response = { all: [], booked: [], cancelled: [] }
        match.user = req.query.user_id;
        if (req.query.type == "all") {
            // all tickets
            response.all = await TicketBooking.find(match).sort({ _id: -1 })
                .populate("train")
                .populate("seats")
                .populate("user", "name");
        } else {
            // booked
            match.ticket_status = "Booked";
            response.booked = await TicketBooking.find(match).sort({ _id: -1 })
                .populate("train")
                .populate("seats")
                .populate("user", "name");
            // cancelled
            match.ticket_status = "Cancelled";
            response.cancelled = await TicketBooking.find(match).sort({ _id: -1 })
                .populate("train")
                .populate("seats")
                .populate("user", "name");
        }
        res.sendResponse(response, 'Get tickets by user - success', 200)
    } catch (error) {
        console.log("error", error);
        res.sendError({ error }, 'Something went wrong!, Please try again', 500);
    }

}

export const getSeatBookingDetails = async (train, seat, req) => {
    try {
        let booked = await TicketBooking.findOne({
            $and: [
                { train: train._id },
                { seats: { $in: [seat._id] } },
                { date: req.body.date },
                { ticket_status: "Booked" }
            ]
        })
        if (booked) {
            return true;
        }
        return false;
    } catch (error) {
        throw 'Error while getting train seat availability'
    }

}