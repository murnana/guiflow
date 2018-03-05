const
    fs = require("fs");

const
    pack = JSON.parse(fs.readFileSync("package.json", {"encoding": "utf8"}));

module.exports = {
    "cpu": pack.cpu.filter((value) => value.search(/^!\w/) < 0),
    "name": pack.name,
    "os": pack.os.filter((os) => os.search(/^!\w/) < 0)
};
