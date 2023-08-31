const UserModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        allowedCashiers: {
            type: DataTypes.STRING,
            default: "[]"
        },
        acclevel: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    };
};

module.exports = UserModel;