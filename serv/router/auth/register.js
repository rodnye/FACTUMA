const config = require("../../../config.js");
const uid = require(config.SERV + "/helpers/uid.js");
const bcrypt = require("bcryptjs");
const { User } = require(config.SERV + "/helpers/db.js");

const register = async (io, socket, id) => {
    socket.on("register", async (data) => {
        let username,
            password,
            rpassword;

        const admin = await User.findOne({
            where: {
                username: "admin"
            }
        });
        if(!admin || admin.user_id != id) return socket.emit("register" , {
            status: false,
            data: "NO_PRIVILEGES"
        });

        try {
            username = (data.username ? data.username : undefined);
            password = (data.password ? data.password : undefined);
            rpassword = (data.rpassword ? data.rpassword : undefined);
        } catch (err) {
            return socket.emit("register", {
                status: false, data: "DATA_ERROR",
                error: err
            })
        }

        if (!username) {
            return socket.emit("register", {
                status: false,
                data: "EMPTY_USER"
            });
        }

        if (username.length < 5) {
            return socket.emit("register", {
                status: false,
                data: "USER_LENGTH"
            })
        }

        else if (!password) {
            return socket.emit("register", {
                status: false,
                data: "EMPTY_PASS"
            });
        }

        if (await User.findOne({
            where: { username: username }
        })) return socket.emit("register", { status: false, data: "ACC_USE" });

        const char = /^[a-zA-Z0-9]+$/;
        if (!char.test(username)) {
            return socket.emit("register", {
                status: false,
                data: "USERNAME_BAD_CHAR"
            });
        }

        if (password.length < 8) {
            return socket.emit("register", {
                status: false,
                data: "PASS_LENGTH"
            });
        }

        if (password != rpassword) {
            return socket.emit("register", {
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

            return socket.emit("register", {
                status: true,
                data: "REGISTERED"
            });

        } catch (err) {
            console.log(err);
            return socket.emit("register", {
                status: false,
                data: "DATA_ERROR",
                error: err
            });

        }
    });
}


module.exports = register;