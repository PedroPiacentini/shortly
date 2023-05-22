import { db } from "../database/database.connections.js";

export async function validateNewEmail(req, res, next) {
    const { email } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (user.rowCount === 1) return res.sendStatus(409);
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}