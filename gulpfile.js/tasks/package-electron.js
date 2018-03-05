const
    del = require("del"),
    gulp = require("gulp"),
    packageJson = require("./package-json-data"),
    packager = require("electron-packager");

const
    ignoreList = [

        ".vscode",
        ".git",
        ".github",
        "dist",
        "gulpfile.js",
        "node_modules",
        "/package($|/)",
        ".gitignore",
        "package-lock.json"

    ],
    outDir = "package",
    outPath = "out/%s".replace(/out/, outDir),
    taskNameTemp = "package:%s";

module.exports = {

    "out-path": outPath,
    "taskName": taskNameTemp

};

gulp.task("package:clean", (done) => del([outDir], () => done()));

const taskNames = packageJson.os.map((os) => {

    const taskName = taskNameTemp.replace(/%s/, os);
    gulp.task(taskName, ["package:clean"], () => packager({
        "arch": packageJson.cpu,
        "asar": true,
        "dir": ".",
        "ignore": ignoreList,
        "name": packageJson.name,
        "out": outPath.replace(/%s/, os),
        "platform": os
    }));
    return taskName;

}).filter((value) => value);

gulp.task("package", taskNames);
