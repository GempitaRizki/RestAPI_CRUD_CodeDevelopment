import sequelize from "sequelize";
import config from "./config";

const sequelize = new sequelize(
    config.db_name,
    config.db_username,
    config.db_password,
    {
        dialect : 'postgres'
    }
)

sequelize
    .authenticate()
    .then(() => console.log('connction has been estabilished succesfully'))
    .catch(err => console.log(err))

export {sequelize}