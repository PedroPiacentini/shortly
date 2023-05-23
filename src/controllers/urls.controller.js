import { db } from "../database/database.connections.js";
import { nanoid } from "nanoid";

export async function shorten(req, res) {
    const { url } = req.body;
    const { user_id } = res.locals.session;
    console.log(user_id)

    const shortUrl = nanoid(8);

    try {

        const result = await db.query(`
            INSERT INTO urls (user_id, short_url, original_url, visit_count)
                VALUES ($1, $2, $3, $4)
                RETURNING url_id;
        `, [user_id, shortUrl, url, 0]);

        res.status(201)
            .send({
                id: result.rows[0].url_id,
                shortUrl
            });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const url = await db.query(`
        SELECT * FROM urls WHERE url_id = $1
          `, [id]);
        if (url.rowCount === 0) return res.sendStatus(404);

        res.status(200).send({
            id,
            shortUrl: url.rows[0].short_url,
            url: url.rows[0].original_url
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function redirect(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = await db.query(`
        UPDATE urls 
        SET visit_count = visit_count + 1
        WHERE short_url = $1
        RETURNING original_url;
          `, [shortUrl]);
        if (url.rowCount === 0) return res.sendStatus(404);

        const originalUrl = url.rows[0].original_url;
        res.redirect(originalUrl);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrlById(req, res) {

    const { id } = req.params;
    const { user_id } = res.locals.session;

    try {
        const url = await db.query(`
            ;
          `, [id]);

        if (url.rowCount === 0) return res.sendStatus(404);

        if (url.rows[0].user_id !== user_id) return res.sendStatus(401);

        await db.query(`
        DELETE FROM urls WHERE url_id = $1;
          `, [id]);
        res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    }
}
