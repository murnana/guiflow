"use strict";
const
    path       = require("path"),
    requireDir = require("require-dir");

requireDir(path.join(__dirname, "tasks"), {"recurse": true});
