class Games {
    constructor() {
        this.games = {};
    }

    /**
     * Add athletes unique by id
     * @param year
     * @param season
     * @param city
     */
    pushGame (year, season, city) {
        // if game with such season and year not exist, add to list
        if (!this.games[year + season]) {
            this.games[year + season] = {
                id: this.getLastIndex(),
                year: year,
                season: season,
                city: [city]
            };
        } else {
            if (!this.games[year + season].city.includes(city)) {
                this.games[year + season].city.push(city);
            }
        }
        return this.games[year + season].id;
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.games).length + 1;
    };

    /**
     * Get formatted games list
     */
    getGames() {
        const target = this.games;
        for (let key in target){
            if (target.hasOwnProperty(key)) {
                target[key].city = target[key].city.join();
            }
        }
        return target;
    }

}

Games.sexEnum = {
    "Summer": 0,
    "Winter": 1
};

module.exports = Games;