import { db } from "../database/database.connections.js";
import { nanoid } from "nanoid";

export async function shorten(req, res) {
    const { url } = req.body;
    const { user_id } = res.locals.session;

    const shortUrl = nanoid(8);

    try {
        const hash = bcrypt.hashSync(password, 10)

        const result = await db.query(`
            INSERT INTO urls (user_id, short_url, original_url, visit_count)
                VALUES ($1, $2, $3, $4)
                RETURNING url_id;
        `, [user_id, shortUrl, url, 0]);

        res
            .send({
                id: result.rows[0].url_id,
                shortUrl
            })
            .status(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}