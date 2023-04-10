const CategorySchema = (sequelize, DataTypes) => {
    const CategoryTable = sequelize.define('Category', {
      name: DataTypes.STRING,
    },
      {
        tableName: 'categories',
        underscored: true,
        timestamps: false
      });
    return CategoryTable;
  };
  
  module.exports = StudentSchema;