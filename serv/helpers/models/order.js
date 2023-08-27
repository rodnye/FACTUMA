const OrderModel = (DataTypes) => {
    return {
        cashier_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        table: {
            type: DataTypes.INTEGER,
            default: 0
        },
        items: {
            type: DataTypes.STRING,
            default: "[]"
        }
    };
};

module.exports = OrderModel;