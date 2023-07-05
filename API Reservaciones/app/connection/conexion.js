const mysql = require("mysql");
const { promisify } = require("util");

const { db } = require("./keys.js");

const con = mysql.createPool(db);
con.getConnection((error) => {
    // console.log(error);
    if (error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (error.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        }
        if (error.code === "ECONNREFUSED") {
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    } else {
        console.log("Conexion exitosa");
    }

    return;
});

promisify(con.query);

module.exports = con;