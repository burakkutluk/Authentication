import jwt from 'jsonwebtoken';

const createToken = async (user, res) => {

    const payload = {
        user: {
            id: user.id,
        },
        name: {
            name: user.name,
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: 3600,
    });

    return res.status(201).json({
        success: true,
        token: token,
        user: payload,
    });

}   

export default createToken;