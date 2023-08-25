const config = require("../../../config.js");

const bcrypt = require("bcryptjs");
const { User } = require(config.SERV + "/helpers/db.js");

const passChanger = async (io, socket, id) => {
    let user = await User.findOne({
        where: {
            user_id: id
        }
    });
    if(!user) {
        socket.emit("alert", "ACC_NOT_FOUND");
        return socket.disconnect();
    }
    socket.on("pass-change", async (data) => {
        if (!bcrypt.compareSync(data.oldpass, user.password)) {
            return socket.emit("pass-change" , {
                status: false,
                data: "WRONG_OLD_PASS"
            });
        }

        if (data.password.length < 8) {
            return socket.emit("pass-change", {
                status: false,
                data: "PASS_LENGTH"
            });
        }

        if (data.password != data.rpassword) {
            return socket.emit("pass-change", {
                status: false,
                data: "PASS_NOT_MATCH"
            });
        }

        if(await user.setData({
            password: data.password
        })) return socket.emit("pass-change", {
            status: true,
            data: "PASS_CHANGED"
        });
        else return socket.emit("pass-change", {
            status: false,
            data: "DATA_ERROR"
        });
    });
};

module.exports = passChanger;