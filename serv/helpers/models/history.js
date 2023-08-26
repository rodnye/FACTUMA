const HistoryModel = (DataTypes) => {
    return {
        cashier_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            unique: false
        },
        data : {
            type: DataTypes.STRING,
            default: "[]"
        },
    };
};

module.exports = HistoryModel;