class Teams {
    constructor() {
        this.teams = {};
    }

    /**
     * Add team unique by noc_name
     * @param name
     * @param noc_name
     */
    pushTeam (name, noc_name) {
        // if team with such noc_name not exist, add to list
        if (!this.teams[noc_name]) {
            this.teams[noc_name] = {
                id: this.getLastIndex(),
                name: name,
                noc_name: noc_name
            };
        }
    };

    /**
     * Get team by noc_name
     * @param noc_name
     * @returns {*}
     */
    findByNOC (noc_name) {
        return this.teams[noc_name];
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.teams).length + 1;
    };
}

module.exports = Teams;