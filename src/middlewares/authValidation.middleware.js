import { db } from "../database/database.connections.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.query(`SELECT * FROM tokens WHERE token=$1`, [token]);
    } catch (err) {
        res.status(500).send(err.message);
    }

}