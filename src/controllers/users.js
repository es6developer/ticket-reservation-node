import { User } from '../models/UserSchema';


export const saveUser = (req, res) => {
    try {
        const user = new User(req.body);
        user.setPassword(req.body.password);
        user.save(async (error, response) => {
            if (error) return res.sendError({ error }, 'Mobile number already exists or failed to register', 500);
            res.sendResponse({ response }, 'Register - success', 200)
        })
    } catch (error) {
        return res.sendError({ error }, 'Something went wrong!', 500);
    }
}

export const loginUser = async (req, res) => {
    try {
        console.log("req.body", req.body);
        let user = await User.findOne({ mobile_number: req.body.mobile })
        if (user === null) return res.sendError({}, 'Invalid Credentials', 500);
        if (!user.validPassword(req.body.password)) return res.sendError({}, 'Incorrect password', 500);
        res.sendResponse({ _id: user._id }, 'Login - success', 200)

    } catch (error) {
        console.log("error", error);
        return res.sendError({ error }, 'Something went wrong!', 500);
    }

}

export const getUserProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.query.id }, { password: 0, salt: 0 });
        res.sendResponse(user, 'Get user - success', 200)
    } catch (error) {
        return res.sendError({ error }, 'Something went wrong!', 500);

    }
}

