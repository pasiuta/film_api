const db = require('../db')
class FilmController {
    async getFilm(req, res) {
        const id = req.params.id;
        const film = await db.query('SELECT * FROM films where id = $1', [id]);
        if (!film.rows[0]) {
            return res.status(404).json({
                error: "film not found",
            });
        }

        res.json(film.rows[0]);
    }
}

module.exports = new FilmController()