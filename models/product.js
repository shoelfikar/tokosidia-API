'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    user_id: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    condition: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    stock_product: DataTypes.STRING,
    weight: DataTypes.STRING,
    category: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    subSubCategory: DataTypes.STRING,
    rating: DataTypes.STRING,
    seller_id: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.category,
      {
        foreignKey: 'category',
        as: 'categoryName'
    });

    product.belongsTo(models.subCategory,
      {
        foreignKey: 'subCategory',
        as: 'subCategoryName',
        // sourceKey: subCategory
    });
    
    product.belongsTo(models.subSubCategory,
      {
        foreignKey: 'subSubCategory',
        as: 'subSubCategoryName'
    });
    product.belongsTo(models.user_id,
      {
        foreignKey: 'user_id',
        as: 'username' 
      })
  };
  return product;
};