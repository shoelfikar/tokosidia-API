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
    product.belongsTo(models.seller, {
      foreignKey: "id",
      as: "myProduct",
      sourceKey: "seller_id"
    });
    // product.belongsTo(models.user_id, {
    //   foreignKey: "user_id",
    //   as: "users",
    //   sourceKey: "id"
    // })
    // product.belongsTo(models.wishlist, {
    //   foreignKey: "produk_id",
    //   as: "Produk-name",
    //   sourceKey: "id"
    // })
    product.belongsTo(models.user_id,
      {
        foreignKey: 'user_id',
        as: 'username' 
    });

    product.hasMany(models.imageDetail,
      {
        foreignKey: 'product_id',
        as: 'images',
    });

    product.belongsTo(models.condition,
      {
        foreignKey: 'condition',
        as: 'kondisi_barang' 
    });

    product.belongsTo(models.seller,
      {
        foreignKey: 'seller_id',
        as: 'toko' 
    });
    
  };
  return product;
};