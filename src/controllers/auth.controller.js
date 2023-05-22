import { db } from "../database/database.connections.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const hash = bcrypt.hashSync(password, 10)

        await db.query(`
            INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3);
        `, [name, email, hash])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = (await db.query(`SELECT * FROM users WHERE email=$1`, [email])).rows;
        if (user.rowCount === 0) return res.sendStatus(401);

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) return res.sendStatus(401);

        const token = uuid();

        await db.query(`
            INSERT INTO tokens (user_id, token)
                VALUES ($1, $2);
        `, [user.user_id, token]);

        res.send({ token }).status(200);

    } catch (err) {
        res.status(500).send(err.message);
    }

    try {

        await db.query(`
            INSERT INTO tokens (name, email, password)
                VALUES ($1, $2, $3);
        `, [name, email, hash])
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}