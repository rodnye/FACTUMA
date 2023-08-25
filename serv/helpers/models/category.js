const CategoryModel = (DataTypes) => {
    return {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    };
};

module.exports = CategoryModel;