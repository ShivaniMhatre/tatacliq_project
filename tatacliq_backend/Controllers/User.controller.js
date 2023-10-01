import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModal from "../Modals/User.modal.js";

export const Register = async (req, res) => {
    try {
        const { name, email, number, password, role } = req.body.regData;
        if (!name || !email || !number || !password || !role) return res.json({ success: false, message: "All Fields Are Required" })

        const isEmailExist = await UserModal.find({ email })
        if (isEmailExist.length) {
            return res.json({
                success: false,
                message: "Email Id Already Exist , Please Try Other Email Id"
            })
        }
        const hashPass = await bcrypt.hash(password, 10)
        const user = new UserModal({
            name,
            email,
            number: parseInt(number),
            password: hashPass,
            role
        })

        await user.save();
        return res.json({
            success: true,
            message: "User Register successfully....."
        })

    } catch (error) {
        res.json({
            success: false,
            message: error
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.loginData;
        if (!email || !password) return res.json({ success: false, message: 'All Fields Are Mandatory' })

        const user = await UserModal.findOne({ email });
        if (!user) return res.json({ success: false, message: 'User Not Found' })

        const isPasswordRight = await bcrypt.compare(password, user.password);
        if (isPasswordRight) {
            const userObj = {
                name: user.name,
                email: user.email,
                number: user.number,
                role: user.role,
                _id: user._id
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return res.json({
                success: true,
                message: "User LoggedIn Successfully...",
                userData: userObj,
                token: token
            })
        }
        return res.json({ success: false, message: 'Password Is Not Match' })

    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

export const GetCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is required!" })

        const decoededData = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoededData, "decoededData")
        if (!decoededData) {
            return res.status(404).json({ success: false, message: "Not valid json token.." })
        }
        // return res.send(decoededData)
        const userId = decoededData?.userId

        const user = await UserModal.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found.." })
        }

        const userObj = {
            name: user?.name,
            email: user?.email,
            _id: user?._id,
            role: user?.role,
            number:user?.number
        }

        return res.status(200).json({ success: true, userData: userObj })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
    
    
    
    // try {
    //     const { token } = req.body;
    //     if (!token) return res.json({ success: false, message: 'Token Is Required' });

    //     const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

    //     console.log(decodeToken, 'decode')
    //     if (!decodeToken) {
    //         return res.json({
    //             success: false,
    //             message: "Token Is Not Valid"
    //         })
    //     }
    //     const userId = decodeToken?.userId

    //     const user = await UserModal.findById({ userId })
    //     if (!user) {
    //         return res.json({
    //             success: false,
    //             message: "User Not Found"
    //         })
    //     }

    //     const userObj = {
    //         name: user?.name,
    //         email: user?.email,
    //         number: user?.number,
    //         role: user?.role,
    //         _id: user?._id
    //     }

    //     return res.json({ success: true, user: userObj })
    // } catch (error) {
    //     return res.json({ success: false, message: error })
    // }
}