# Tokosidia API (CLONE Tokopedia)

[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/HiRahmat-Dev/tokosidia-API)
![GitHub contributors](https://img.shields.io/github/contributors/HiRahmat-Dev/tokosidia-API)
![GitHub stars](https://img.shields.io/github/stars/HiRahmat-Dev/tokosidia-API?style=social)
![GitHub forks](https://img.shields.io/github/forks/HiRahmat-Dev/tokosidia-API?style=social)
![Tweet](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FHiRahmat-Dev%2Ftokosidia-API
)

<p align="center">
  <a href="https://raw.githubusercontent.com/HiRahmat-Dev/tokosidia-API/master/images/tokosidia-logo.png" target="blank">
    <img width="340" src="https://raw.githubusercontent.com/HiRahmat-Dev/tokosidia-API/master/images/tokosidia-logo.png">
  </a>
</p>
<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
- [Prerequiste](#prerequiste)
- [Installation](#installation)
- [Link Collection Postman](#link-collection-postman)
- [Structure Folder](#structure-folder)
- [Contributing](#contributing)
- [Related Project](#related-project)
- [Contributors](#contributors)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.
- Sequelize - Download and Install [Sequelize](https://sequelize.org/)

## Installation
### Clone
```
$ git clone https://github.com/HiRahmat-Dev/tokosidia-API.git
$ cd tokosidia-API
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT="Your_Port"

```

### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[Postman](https://www.getpostman.com/collections/bb923819853137d50b60)

## Structure Folder
```
\---src
|    \---controller
|    |   +---AddressController.js
|    |   +---BankAccountController.js
|    |   +---BankController.js
|    |   +---CartController.js
|    |   +---CategoryController.js
|    |   +---FavoritShopController.js
|    |   +---HistoryController.js
|    |   +---HistoryDetailController.js
|    |   +---OrderController.js
|    |   +---OrderDetailController.js
|    |   +---productController.js
|    |   +---RoleIdController.js
|    |   +---SellerController.js
|    |   +---StatusController.js
|    |   +---SubCategoryController.js
|    |   +---SubSubCategoryController.js
|    |   +---UserIdController.js
|    |   +---WishlistController.js
|    \---helper
|    |   +---auth.js
|    |   +---response.js
|    |   +---upload.js
|    \---models
|    |   +---address.js
|    |   +---bank_account.js
|    |   +---bank.js
|    |   +---cart.js
|    |   +---category.js
|    |   +---condition.js
|    |   +---expedition.js
|    |   +---favorit_shop.js
|    |   +---history_detail.js
|    |   +---history.js
|    |   +---imageDetail.js
|    |   +---index.js
|    |   +---order_detail.js
|    |   +---order.js
|    |   +---payment.js
|    |   +---product.js
|    |   +---role_id.js
|    |   +---seller.js
|    |   +---shipment_time.js
|    |   +---status.js
|    |   +---subcategory.js
|    |   +---subsubcategory.js
|    |   +---user_id.js
|    |   +---wishlist.js
|    \---router
|    |   +---address.js
|    |   +---bank.js
|    |   +---bankAccount.js
|    |   +---cart.js
|    |   +---category.js
|    |   +---favoritShop.js
|    |   +---history.js
|    |   +---historyDetail.js
|    |   +---index.js
|    |   +---order.js
|    |   +---orderDetail.js
|    |   +---product.js
|    |   +---roleId.js
|    |   +---seller.js
|    |   +---status.js
|    |   +---subCategory.js
|    |   +---subSubCategory.js
|    |   +---userId.js
|    |   +---wishlist.js
+---app.js
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend-Tokosidia-VueJS`](https://github.com/HiRahmat-Dev/tokosidia-vuejs)
* [`Backend-Tokosidia`](https://github.com/HiRahmat-Dev/tokosidia-API)

## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/HiRahmat-Dev/">
          <img width="150" src="https://avatars2.githubusercontent.com/u/55150659?s=460&u=c7171bb4128787c303efdce0d62bc86289f1211b&v=4" alt="Rahmat Hidayatullah"><br/>
          <b>Rahmat Hidayatullah</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/fblazt">
          <img width="150" src="https://avatars3.githubusercontent.com/u/48191467?s=400&u=c06616d146930100dfb5eb5c4ab10fd00d01ac41&v=4" alt="Firman"><br/>
          <b>Firman</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/azmprllynsa">
          <img width="150" src="https://avatars1.githubusercontent.com/u/60286175?s=400&v=4" alt="azmprllynsa"><br/>
          <b>azmprllynsa</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/m-joseph27">
          <img width="150" src="https://avatars2.githubusercontent.com/u/60948526?s=400&u=c258f85ec35ccfda6ce3911dae79d45e335088b3&v=4" alt="Muhammad Yusuf"><br/>
          <b>Muhammad Yusuf</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/shoelfikar">
          <img width="150" src="https://avatars2.githubusercontent.com/u/55390061?s=400&u=cf1b3f5b68b4f984a45cc215c7b98150ab01276b&v=4" alt="Sulfikar"><br/>
          <b>Sulfikar</b>
        </a>
      </td>
    </tr>
  </table>
</center>
