const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const user = require('../services/user')

const get = async (req, res, next) => {
    try {
        return res.json(await user.getRetrieve(req.params.id))
    } catch (err) {
        console.error(`Error while getting user `, err.message)
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).json({ "detail": "All input is required" });
        }

        // Validate if user exist in our database
        let loginUser = await await user.filter({ email })

        if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: loginUser.id, email },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1d",
                }
            );

            // save user token
            loginUser.token = token;

            // user
            return res.status(200).json(loginUser);
        }
        res.status(400).json({ "detail": "Invalid Credentials" });
    } catch (err) {
        console.error(`Error while login user `, err.message)
        next(err)
    }
}

const register = async (req, res, next) => {
    try {
        // Get user input
        const { first_name, last_name, email, password, secret_key } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return res.status(400).json({ "detail": "All input is required" });
        }

        // Validate secret key
        if (secret_key !== process.env.REGISTER_SECRET_KEY) {
            return res.status(400).json({ "detail": "Invalid register secret key." });
        }

        // Validate email
        var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!email.match(validEmail)) return res.status(400).json({ "detail": "Invalid email address" });

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await user.filter({ email })

        if (oldUser) {
            return res.status(409).json({ "detail": "User Already Exist. Please Login" });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        let loginUser = await user.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        // save user token
        loginUser.token = token;

        // return new user
        res.status(201).json(loginUser);
    } catch (err) {
        console.error(`Error while login user `, err.message)
        next(err)
    }
}

module.exports = {
    get,
    login,
    register
}