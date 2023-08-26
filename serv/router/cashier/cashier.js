const config = require("../../../config.js");
const uid = require(config.SERV + "/helpers/uid.js");
const { User, Cashier , Op} = require(config.SERV + "/helpers/db.js");

const cashierData = async (socket, data) => {
    const cashier = await Cashier.findOne({
        where: {
            [Op.or] : {
                cashier_id : data.cashier_id,
                name : data.name
            }
        }
    });

    if(!cashier) return socket.emit("alert" , "CASHIER_NOT_FOUND");

    return socket.emit("cashier-data" , cashier);
};

const cashierList = async (socket) => {
    const cashier = await Cashier.findAll();

    return socket.emit("cashier-list" , cashier);
};

const cashierMakePayment = async (io , socket , id , data) => {
    //TODO
};

const cashierReceivePayment = async (io , socket , id , data) => {
    //TODO
};


module.exports = { cashierData , cashierList }
