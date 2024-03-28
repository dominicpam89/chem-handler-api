"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var sqlite3 = require("sqlite3");
var jsonData = JSON.parse((0, fs_1.readFileSync)("db.json", "utf8"));
var db = new sqlite3.Database("db.sqlite");
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS compound (\n        pk INTEGER PRIMARY KEY,\n        trivial_name TEXT,\n        cas_number TEXT,\n        inci_name TEXT,\n        smiles TEXT,\n        comedogenicity_class INTEGER)");
    var insertStmt = db.prepare("INSERT INTO compound (trivial_name, cas_number, inci_name, smiles, comedogenicity_class) VALUES (?, ?, ?, ?, ?)");
    jsonData.forEach(function (item) {
        insertStmt.run(item.trivial_name, item.cas_number, item.inci_name, item.smiles, item.comedogenicity_class);
    });
    insertStmt.finalize();
    db.run("CREATE TABLE IF NOT EXISTS user (\n        id INTEGER PRIMARY KEY,\n        first_name TEXT,\n        last_name TEXT,\n        username TEXT,\n        email TEXT NOT NULL,\n        password TEXT NOT NULL)");
});
db.close();
