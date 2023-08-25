const ItemModel = (DataTypes) => {
    return {
        item_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            default: "others"
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pic: {
            type: DataTypes.STRING,
            default: "default"
        },
        price: {
            type: DataTypes.INTEGER,
            default: 0
        }
    };
};

module.exports = ItemModel;