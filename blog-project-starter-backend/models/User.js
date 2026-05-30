const db = require("../config/db");

// FIND USER BY EMAIL

const findUserByEmail = (email, callback) => {

    const sql =
        "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);

};

// CREATE USER

const createUser = (name, email, password, callback) => {

    const sql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(
        sql,
        [name, email, password],
        callback
    );

};

module.exports = {

    findUserByEmail,

    createUser

};