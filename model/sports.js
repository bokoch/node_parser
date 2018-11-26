class Sports {
    constructor() {
        this.sports = {};
    }

    /**
     * Add team unique by name
     * @param name
     */
    pushSport (name) {
        // if team with such noc_name not exist, add to list
        if (!this.sports[name]) {
            this.sports[name] = {
                id: this.getLastIndex(),
                name: name,
            };
        }
        return this.sports[name].id;
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.sports).length + 1;
    };
}

module.exports = Sports;