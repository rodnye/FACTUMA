const StockModel = (DataTypes) => {
    return {
        item_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            default: 0
        }
    };
};

module.exports = StockModel;