-- Create User Table
CREATE TABLE Account (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  date_registered DATE,
  address VARCHAR(255),
  phone_number VARCHAR(20)
);

-- Create Category Table
CREATE TABLE Categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(50),
  parent_category_id INT,
  FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id)
  
);

-- Create Product Table
CREATE TABLE Product (
  product_id SERIAL PRIMARY KEY,
  seller_id INT,
  product_name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  created_at TIMESTAMP,
  category_id INT,
  image_url VARCHAR(255),
  FOREIGN KEY (seller_id) REFERENCES Account(user_id)
  FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

INSERT INTO Account (username, email, password, date_registered, address, phone_number)
VALUES ('JustinStArnaud', 'justinstarnaud@hotmail.com', 'sjsj', '2023-05-04', '22 west hill', '514-604-2309');

INSERT INTO Product (seller_id, product_name, description, price, category_id ,created_at, image_url)
VALUES (1, 'Sac à dos', 'Sac à dos 85L', '85', 1, CURRENT_TIMESTAMP, 'assets/images/');

SELECT * from Product
INNER JOIN Account ON Account.user_id = Product.seller_id;

-- LANDING PAGE
CREATE VIEW v_products_landing_page AS
SELECT Product.product_id, Product.product_name, Account.address, Product.price from Product
INNER JOIN Account ON Account.user_id = Product.seller_id;
