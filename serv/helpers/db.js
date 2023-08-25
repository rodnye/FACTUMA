const config = require("../../config.js");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const UserModel = require("./models/user.js");
const uid = require("./uid.js");

/**********************
 * Starting Connection *
 **********************/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.SERV + '/db/db.sqlite',
    logging: false
});

(async () => {
    try {
        sequelize.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

/*********************
 *   User Model DB   *
 *********************/
class User extends Model {
    getData() {
        const rows = ["user_id", "username",];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

User.init(
    UserModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await User.sync();
    let admin = User.findOne({
        where: {
            username: "admin"
        }
    });
    if (!admin) {
        admin = await User.create({
            user_id: uid.num(8),
            username: "admin",
            password: "admin"
        });
        if(admin) console.log("Cuenta de administracion creada...\n\nUser: admin\nPassword: admin\n\nPor favor cambie su contrasena para mejor proteccion en la configuracion de administracion.");
        else{
            console.log("Ocurrio un error , pongase en contacto con el administrador.");
        }
    }
})();



module.exports = {
    User,
    Op
}