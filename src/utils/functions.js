const { resolve, basename } = require('path');
const { readdirSync } = require('fs');


function readdirsSync(path) {
    const dirents = readdirSync(path, { withFileTypes: true });
    const files = dirents.map(dirent => {
        const res = resolve(path, dirent.name);
        return dirent.isDirectory() ? readdirsSync(res) : res;
    });
    return Array.prototype.concat(...files);
}

function loadEvents(client, path) {
    const files = readdirsSync(path).filter(file => file.endsWith('js'));

    files.forEach(file => {
        const event = require(file);
        const eventName = basename(file, '.js');
        client.on(eventName, (...args) => event.execute(...args, client));
    });
}

function loadCommands(client, path) {
    const files = readdirsSync(path).filter(file => file.endsWith('js'));

    files.forEach(file => {
        const command = require(file);
        const commandName = basename(file, '.js');
        client.commands.set(commandName, command);
    });
}

module.exports = {
    loadEvents,
    loadCommands,
}