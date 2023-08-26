const config = require("../../../config.js");
const authenticator = require("./authenticator.js");
const bcrypt = require("bcryptjs");
const {User} = require(config.SERV + "/helpers/db.js");

/* function login
* @Method : POST
* @param req {body : {username , password }}
* @param res {}
*/

const login = async (req, res) => {
    if (!req.body) return res.json({status : false , data : "NO_DATA"});
    let username,
    password;
    try {
        const body = req.body;
        username = body.username;
        password = body.password;
    } catch (err) {
        return res.json({
            status: false,
            data: "DATA_ERROR",
            error: err
        });
    }

    const account = await User.findOne({
        where : {
            username : username
        }
    });

    if (!account) {
        return res.json({
            status: false,
            data: "WRONG_USER"
        });
    }
    

    if (!bcrypt.compareSync(password, account.password)) {
        return res.json({
            status: false,
            data: "WRONG_USER"
        });
    }

    return res.json({
        status: true,
        data: authenticator.generate(account.user_id)
    });
}

module.exports = login;