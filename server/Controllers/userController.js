import User from "../Models/userSchema.js"

const userController = () => {


    return {

        async getallusers(req, res) {
         const users = await User.find({})
         res.send(users)
        },

        async postregister(req, res) {

            const nameExist = await User.findOne({ name: req.body.name })
            if (nameExist) return res.status(400).send('name already exists')

            const emailExist = await User.findOne({ email: req.body.email })
            if (emailExist) return res.status(400).send('email already exists')

            const phonenumberExist = await User.findOne({ phonenumber: req.body.phonenumber })
            if (phonenumberExist) return res.status(400).send('Phone Number already exists')

            const { name, email, phonenumber, password } = req.body

            const user = new User({
                name,
                email,
                phonenumber,
                password,
            })

            user.save().then((user) => {
                // Login
                res.send(user)
                return res.redirect('/')
            }).catch(error => {
                res.send(error)
            })

        }

    }

}

export default userController
