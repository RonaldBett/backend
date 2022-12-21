require('dotenv').config()

module.exports = {
    PORT_SERVER:process.env.PORT_SERVER,
    HOST:process.env.HOST,
    PORT_DB:process.env.PORT_DB,
    USER_DB:process.env.USER_DB,
    PWD_DB:process.env.PWD_DB,
    NAME_DB:process.env.NAME_DB,
}