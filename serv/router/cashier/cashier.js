const config = require("../../../config.js");
const uid = require(config.SERV + "/helpers/uid.js");
const { User, Cashier, Op } = require(config.SERV + "/helpers/db.js");

const cashierCreate = async (socket, id, data) => {
    const admin = await User.findOne({
        where: {
            user_id: id
        }
    });

    if (!admin || admin.acclevel <= 1) return socket.emit("alert", "NO_PRIVILEGES");

    const cashier = await Cashier.create({
        cashier_id: uid.num(5),
        name: data.name,
        tables: (data.tables && Number.isInteger(data.tables) ? data.tables : 0)
    });

    if (!cashier) return socket.emit("alert", "DATABASE_ERROR");

    return socket.emit("cashier-create", "CASHIER_CREATED");
}

const cashierDelete = async (socket, id, data) => {
    const admin = await User.findOne({
        where: {
            user_id: id
        }
    });

    if (!admin || admin.acclevel <= 1) return socket.emit("alert", "NO_PRIVILEGES");

    const cashier = await Cashier.findOne({
        where: {
            [Op.or]: {
                cashier_id: data.cashier_id,
                name: data.name
            }
        }
    });

    if (!cashier) return socket.emit("alert", "CASHIER_NOT_FOUND");

    await cashier.drop();

    return socket.emit("cashier-delete", "CASHIER_DELETED");
}

const cashierData = async (socket, data) => {
    const cashier = await Cashier.findOne({
        where: {
            [Op.or]: {
                cashier_id: data.cashier_id,
                name: data.name
            }
        }
    });

    if (!cashier) return socket.emit("alert", "CASHIER_NOT_FOUND");

    return socket.emit("cashier-data", cashier);
};

const cashierList = async (socket) => {
    const cashier = await Cashier.findAll();

    return socket.emit("cashier-list", cashier);
};

const cashierListRest = async (req , res) => {
    const cashiers = await Cashier.findAll();

    return res.json(cashiers);
};

const cashierMakePayment = async (io, socket, id, data) => {
    //TODO
};

const cashierReceivePayment = async (io, socket, id, data) => {
    //TODO
};


module.exports = {
    cashierCreate,
    cashierDelete,
    cashierData,
    cashierList,
    cashierMakePayment,
    cashierReceivePayment,
    cashierListRest
};
