class Results {
    constructor() {
        this.results = {};
    }

    /**
     * Add result unique by id
     * @param athlete_id
     * @param game_id
     * @param sport_id
     * @param event_id
     * @param medal
     */
    pushResult (athlete_id, game_id, sport_id, event_id, medal) {
        const id = this.getLastIndex();
        this.results[id] = {
            id: id,
            athlete_id: athlete_id,
            game_id: game_id,
            sport_id: sport_id,
            event_id: event_id,
            medal: medal
        };
        return this.results[id].id;
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.results).length + 1;
    };

    getResults() {
        return this.results;
    }
}

Results.medalEnum = {
    "NA": 0,
    "Gold": 1,
    "Silver": 2,
    "Bronze": 3
};

module.exports = Results;