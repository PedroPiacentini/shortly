import { db } from "../database/database.connections.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.query(`SELECT * FROM tokens WHERE token=$1`, [token]);
        if (session.rowCount === 0) return res.sendStatus(401);

        res.locals.session = session.rows[0];

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}