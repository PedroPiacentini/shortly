import { db } from "../database/database.connections.js";

export async function getUserMe(req, res) {
    const { user_id } = res.locals.session;

    try {

        const user = await db.query(`
        SELECT
            users.user_id AS id,
            users.name,
            SUM(urls.visit_count) AS "visitCount",
            json_agg(json_build_object(
            'id', urls.url_id,
            'shortUrl', urls.short_url,
            'url', urls.original_url,
            'visitCount', urls.visit_count
            )) AS "shortenedUrls"
        FROM
            users
        INNER JOIN urls ON users.user_id = urls.user_id
        WHERE
            users.user_id = $1
        GROUP BY
            users.user_id, users.name;
        `, [user_id]);

        res.status(200).send(user.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res) {

    try {

        const user = await db.query(`
        SELECT
            users.user_id AS id,
            users.name,
            COUNT(urls.url_id) AS "linksCount",
            SUM(urls.visit_count) AS "visitCount"
        FROM
            users
            LEFT JOIN urls ON users.user_id = urls.user_id
        GROUP BY
            users.user_id, users.name, urls.visit_count
        ORDER BY
            "visitCount" DESC
        LIMIT
            10;
        `);

        res.status(200).send(user.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}