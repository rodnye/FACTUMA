const config = require("../../config.js");
const { User } = require(config.SERV + "/helpers/db.js");
const auth = require("./auth/authenticator.js");
// Socket Routers
const register = require("./auth/register.js");
const passChanger = require("./auth/pass-changer.js");

//export router
module.exports = (io) => {
    io.on("connection" , async (socket) => {
        if (!socket.handshake.query) {
            socket.emit("alert", "EMPTY_TOKEN");
            socket.disconnect();
            return;
        }
        const token = socket.handshake.query.token;
        if (!token) {
            socket.emit("alert", "EMPTY_TOKEN")
            socket.disconnect();
            return;
        }
        const id = auth.verify(token);
        if (!id) {
            socket.emit("alert", "WRONG_TOKEN");
            socket.disconnect();
            return;
        }
        const user = await User.findOne({
            where: {
                user_id: id
            }
        });
        if (!user) {
            socket.emit("alert", "USER_NOT_FOUND");
            socket.disconnect();
            return;
        }

        io.sockets[id] = socket;
        register(io , socket , id);
        passChanger(io , socket, id);
    
        socket.on("disconnect", async (data) => {
            delete io.sockets[id];
        });
    });
};