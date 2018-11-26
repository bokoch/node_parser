class Events {
    constructor() {
        this.events = {};
    }

    /**
     * Add team unique by name
     * @param name
     */
    pushEvent (name) {
        // if event with such name not exist, add to list
        if (!this.events[name]) {
            this.events[name] = {
                id: this.getLastIndex(),
                name: name,
            };
        }
        return this.events[name].id;
    };

    /**
     * Get index for insert entity
     * @returns {*}
     */
    getLastIndex () {
        return Object.keys(this.events).length + 1;
    };
}

module.exports = Events;