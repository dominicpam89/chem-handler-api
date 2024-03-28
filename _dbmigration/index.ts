import { readFileSync } from "fs";
import * as sqlite3 from "sqlite3";

const jsonData = JSON.parse(readFileSync("db.json", "utf8"));

const db = new sqlite3.Database("db.sqlite");

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS compound (
        pk INTEGER PRIMARY KEY,
        trivial_name TEXT,
        cas_number TEXT,
        inci_name TEXT,
        smiles TEXT,
        comedogenicity_class INTEGER)`);
	const insertStmt = db.prepare(
		`INSERT INTO compound (trivial_name, cas_number, inci_name, smiles, comedogenicity_class) VALUES (?, ?, ?, ?, ?)`
	);
	jsonData.forEach((item) => {
		insertStmt.run(
			item.trivial_name,
			item.cas_number,
			item.inci_name,
			item.smiles,
			item.comedogenicity_class
		);
	});
	insertStmt.finalize();

	db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        username TEXT,
        email TEXT NOT NULL,
        password TEXT NOT NULL)`);
});
db.close();
