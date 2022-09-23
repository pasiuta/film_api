const db = require('../db/db')
const cache = require('../db/cache')
let nodeCache = {}
const nodeTimeout = 15000;
const cacheTimeout = 30

class FilmController {
    async getFilm(req, res) {
        const title = req.params.title;
        if (nodeCache[title]) {
            console.log('found node cache')
            return res.json(JSON.parse(nodeCache[title]));
        }
        const cachedData = await cache.get(title)
        if (cachedData) {
            console.log('found cache data')
            return res.json(JSON.parse(cachedData));
        }

        const query = await db.query('SELECT * FROM film where title = $1', [title]);
        const dbData = query.rows[0]
        if (!dbData) {
            return res.status(404).json({
                error: "film not found",
            });
        }
        console.log('found in db')
        nodeCache[title] = JSON.stringify(dbData)
        setTimeout(() => {
            console.log("Delayed for 15 seconds.");
            delete nodeCache[title]
        }, nodeTimeout)
        await cache.set(title, JSON.stringify(dbData), {EX: cacheTimeout})
        return res.json(dbData);
    }

}

module.exports = new FilmController()