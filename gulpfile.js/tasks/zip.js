const
    del = require("del"),
    gulp = require("gulp"),
    packElec = require("./package-electron"),
    packageJson = require("./package-json-data"),
    zip = require("gulp-zip");

const
    inputPathTemp = "package/name-os-cpu/**".
        replace(/package/, packElec["out-path"]).
        replace(/%s/, "os").
        replace(/name/, packageJson.name),
    outPathTemp = "os-cpu.zip",
    outputDir = "dist",
    taskNameTemp = "zip:os-cpu";

module.exports = {
    "output-dir": outputDir,
    "task-name": taskNameTemp
};

gulp.task("zip:clean", (done) => del([outputDir], () => done()));

const taskNames = packageJson.os.map((os) => {

    const
        packageTaskName = packElec.taskName.replace(/%s/, os);

    return packageJson.cpu.map((cpu) => {

        const
            inputPath = inputPathTemp.replace(/os/g, os).replace(/cpu/, cpu),
            outputPath = outPathTemp.replace(/os/, os).replace(/cpu/, cpu),
            taskName = taskNameTemp.replace(/os/, os).replace(/cpu/, cpu);
        gulp.task(
            taskName, [
                "zip:clean",
                packageTaskName
            ],
            () => gulp.src([inputPath], {"src": inputPath}).
                pipe(zip(outputPath)).
                pipe(gulp.dest(outputDir))
        );

        return taskName;

    });

}).reduce((prev, current) => prev.concat(current), []);

gulp.task("zip", taskNames);
