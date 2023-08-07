# Green Bridge

[Green Bridge App ](https://green-bridge.netlify.app/)

Built using [MERN stack](https://www.mongodb.com/languages/mern-stack-tutorial)
<br>

## Description

This is an app to democratize plants and flowers delivery, by connecting customers and shops with independent drivers.

# Client / Frontend

## React Router Routes (React App)

| Path                       | Page/Component             | Permissions                | Behavior                                                |
| -------------------------- | -------------------------- | -------------------------- | ------------------------------------------------------- |
| `/login`                   | Login                      | anon only `<AnonRoute>`    | Login form, navigates to home page after login.         |
| `/signup`                  | Signup                     | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.       |
| `/`                        | HomePage                   | public `<Route>`           | Home page.                                              |
| `/userdetails`             | ProfilePage                | user only `<PrivateRoute>` | User and player profile for the current user.           |
| `/stores`                  | ListStores                 | user only `<PrivateRoute>` | Stores list.                                            |
| `/stores/:storeId`         | StoreDetail                | user only `<PrivateRoute>` | Store details. Shows products list .                    |
| `/mycart`                  | StoreCheckout              | user only `<PrivateRoute>` | Show list of products added to cart                     |
| `/mystore`                 | Store Admin details        | user only `<PrivateRoute>` | Show and update the store details                       |
| `/mystore/:storeId/orders` | Store orders Admin details | user only `<PrivateRoute>` | Show and update the store orders                        |
| `/myorders`                | User orders details        | user only `<PrivateRoute>` | Show user orders                                        |
| `/driver/orders`           | OrdersToDeliver            | user only `<PrivateRoute>` | Show and accept Driver Orders ready to deliver          |
| `/driver/orders/:orderId`  | OrderDetails               | user only `<PrivateRoute>` | Show and manage the details of the Driver Orders orders |
| `/driver/myorders`         | DriverOrders               | user only `<PrivateRoute>` | Show Driver Orders orders                               |

## Pages

- HomePage

### Auth Pages

- Login

- Signup

### Client Pages

- UserDetails

- EditProfilePage

- MyOrders

### Store Pages

- MyStore

- AddStore

- CreateProduct

- StoreDetails

- Checkout

- StoreOrders

### Driver Pages

- DriverOrders

- DriverOrderCard

- OrderDetails

- OrdersToDeliver

## Components:

- UpdateStoreForm

- UpdateOrderModal

- StoreOrderCard

- StoreCard

- ProfileAvatar

- ProductCard

- OrderCard

- NavBarUI

- MyStoreProductCard

- IsPrivate

- IsAnon

- FormUpdateUser

- Footer

- FeaturesHomePage

- CartUI

- AddressSearchBar

# Server / Backend

## Models

**User model**

```javascript
{
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    isDriver: { type: Boolean },
    img: { type: String },
    address: { type: Object },
    store: { type: Schema.Types.ObjectId, ref: 'Store' }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
```

**Store model**

```javascript
{
  name: { type: String, required: true },
  img: { type: String },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  address: { type: Object }
}
```

**Product Model**

```javascript
{
  name: { type: String, required: true },
  img: { type: String },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  price: { type: Number, required: true },
  stock: { type: Number },
  status: {
    type: String,
    enum: ['enabled', 'disabled', 'deleted']
  }
}
```

**Order model**

```javascript
{
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number }
    }
  ],
  status: {
    type: String,
    enum: [
      'cart',
      'new',
      'preparing',
      'ready',
      'delivering',
      'delivered',
      'canceled'
    ],
    required: true
  },
  total: { type: Number },
  shipping: { type: Number }
}
```

<br>

## API Endpoints (backend routes)

### Auth

| HTTP Method | URL             | Request Body                             | Success status | Error Status | Description                                                                                                         |
| ----------- | --------------- | ---------------------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`  | {name, email, password}                  | 200            | 404          | Checks if fields not empty and user not exists, then create user with encrypted password, and store user in session |
| POST        | `/auth/login`   | {username, password}                     | 200            |              | Checks if fields not empty if user exists and if password matches then stores user in session                       |
| GET         | `/auth/verify`  |                                          |                |              | Verifies the JWT                                                                                                    |
| GET         | `/api/user/:id` |                                          |                |              | show the customer profile details                                                                                   |
| PUT         | `/api/user/:id` | { name, img, location, store, isDriver } | 200            | 404          | Update the customer profile details                                                                                 |

### Stores

| HTTP Method | URL                    | Request Body                             | Success status | Error Status | Description                      |
| ----------- | ---------------------- | ---------------------------------------- | -------------- | ------------ | -------------------------------- |
| GET         | `/api/stores`          |                                          |                | 400          | Show all available stores        |
| GET         | `/api/stores/:storeId` |                                          |                |              | Show details of a specific store |
| POST        | `/api/stores`          | { name, img, address, admin }            |                | 400          | Create and save a new store      |
| PUT         | `/api/stores/:id`      | { name, img, address, products, orders } | 200            | 400          | edit the store                   |
| DELETE      | `/api/stores/:id`      |                                          | 201            | 400          | delete store                     |

### Products

| HTTP Method | URL                        | Request Body                               | Success status | Error Status | Description               |
| ----------- | -------------------------- | ------------------------------------------ | -------------- | ------------ | ------------------------- |
| GET         | `/api/products/:productId` |                                            |                | 400          | List details of a product |
| POST        | `/api/products/`           | { name, store, img, price, stock, status } |                | 400          | Create a Product          |
| PUT         | `/api/products/:productId` | { name, store, img, price, stock, status } |                | 400          | update a Product          |
| Delete      | `/api/products/:productId` |                                            |                | 400          | Delete a Product          |

### Orders

| HTTP Method | URL                            | Request Body                                       | Success status | Error Status | Description                                             |
| ----------- | ------------------------------ | -------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------- |
| GET         | `/api/orders`                  |                                                    |                | 404          | Get all orders                                          |
| GET         | `/api/orders/:orderId`         |                                                    |                | 404          | List details of an order                                |
| GET         | `/api/orders/user/:userId`     |                                                    |                | 404          | Get all orders for given user                           |
| GET         | `/api/orders/driver/:driverId` |                                                    |                | 404          | Get all orders for given driver                         |
| POST        | `/api/orders`                  | { store, user, products, status, total, shipping } |                | 400          | Create a new order                                      |
| PUT         | `/api/orders/:orderId`         | { status, products, total, driver }                |                | 400          | Update an order - receives only one product per request |
| DELETE      | `/api/orders/:orderId`         |                                                    |                |              | Delete an order                                         |

<br>

## Technologies and API's

### Frontend

- [Vite](https://vitejs.dev/guide/) - Built on React
- [axios](https://www.npmjs.com/package/axios)
- [chakra-ui/react
  ](https://www.npmjs.com/package/@chakra-ui/react)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-toastify](https://www.npmjs.com/package/react-toastify)
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
- [Google Maps Reverse Geocoding](https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding)
- [Deployed on Netlify](https://app.netlify.com/)

### Backend

- [Express](https://www.npmjs.com/package/express)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-jwt](https://www.npmjs.com/package/express-jwt)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [multer](https://www.npmjs.com/package/multer)
- [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)

### Database

- [MongoDB](https://www.mongodb.com/atlas/database)

  <br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/xIR9t7e0/plant-delivery)

### GitHub

[Client repository Link](https://github.com/pedro-louro/green-bridge-client)

[Server repository Link](https://github.com/pedro-louro/green-bridge-server)

### Contributors

Pedro Louro

- <https://github.com/pedro-louro>
- <https://www.linkedin.com/in/pedro-dlouro/>
