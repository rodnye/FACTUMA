const config = require("../../../config.js");
const uid = require(config.SERV + "/helpers/uid.js");
const bcrypt = require("bcryptjs");
const { User } = require(config.SERV + "/helpers/db.js");

/* Funtion register
 * @params req{ body : {username, password , rpassword , token}}
 * @params res {}
 */

const register = async (req, res) => {

    let username,
        password,
        rpassword,
        token;

    try {
        const body = req.body;
        username = (body.username ? body.username : undefined);
        password = (body.password ? body.password : undefined);
        rpassword = (body.rpassword ? body.rpassword : undefined);
        token = (body.token ? body.token : undefined)
    } catch (err) {
        return res.json({
            status: false,
            data: "DATA_ERROR"
        });
    }

    if (!username) {
        return res.json({
            status: false,
            data: "EMPTY_USER"
        });
    }
    
    if(username.length < 5){
        return res.json({
            status: false,
            data: "USER_LENGTH"
        })
    }

    else if (!password) {
        return res.json({
            status: false,
            data: "EMPTY_PASS"
        });
    }

    if (await User.findOne({
            where: { username: username }
        })) return res.json({ status: false, data: "ACC_USE" });

    const char = /^[a-zA-Z0-9]+$/;
    if (!char.test(username)) {
        return res.json({
            status: false,
            data: "USERNAME_BAD_CHAR"
        });
    }

    if (password.length < 8) {
        return res.json({
            status: false,
            data: "PASS_LENGTH"
        });
    }

    if (password != rpassword) {
        return res.json({
            status: false,
            data: "PASS_NOT_MATCH"
        });
    }


    try {
        await User.create({
            user_id: parseInt(uid.num(8)),
            username: username,
            password: bcrypt.hashSync(password, 10)
        });

        return res.json({
            status: true,
            data: "REGISTERED"
        });

    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            data: "DATA_ERROR",
            error: err
        });

    }
}


module.exports = register;