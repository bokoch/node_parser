class Athletes {
    constructor() {
        this.athletes = {};
    }

    /**
     * Add athletes unique by id
     * @param id
     * @param name
     * @param sex
     * @param params
     * @param year_of_birth
     * @param team_id
     */
    pushAthlete (id, name, sex, year_of_birth, params, team_id) {
        // if athelete with such ID not exist, add to list
        if (!this.athletes[id]) {
            this.athletes[id] = {
                id: id,
                full_name: name,
                sex: sex,
                year_of_birth: year_of_birth,
                params: params,
                team_id: team_id,
            };
        }
        return this.findByID(id);
    };

    /**
     * Get athlete by id
     * @param id
     * @returns {*}
     */
    findByID (id) {
        return Object.keys(this.athletes).indexOf(id);
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.athletes).length + 1;
    };
}

Athletes.sexEnum = {
    "M": 0,
    "F": 1
};

module.exports = Athletes;