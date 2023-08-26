const config = require("../../../config.js");
const {cashierData , cashierList } = require("./cashier.js");

module.exports = async (io , socket , id) => {
    socket.on("cashier-data" , async (data) => {
        await cashierData(socket, data);
    });

    socket.on("cashier-list" , async () => {
        await cashierList(socket);
    });
};