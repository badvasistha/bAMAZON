CREATE DATABASE bamazon_db;

-- all of the code will affect "bamazon" --
USE bamazon_db;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
ProductName  VARCHAR(50) NOT NULL,
DepartmentName VARCHAR(50) NOT NULL,
Price DECIMAL(10,2),
StockQuantity INTEGER(10),
PRIMARY KEY (ItemID)
);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Nightstand", "Furniture", 29.95, 15);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Recliner", "Furniture", 199, 10);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Dresser", "Furniture", 199, 2);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Lamp", "Decor", 24.95, 5);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Succulents", "Plants", 14.95, 5);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Cooking Pan", "Kitchen", 10.99, 1);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Microwave", "Electronics", 49, 10);
INSERT INTO products ( ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Blender", "Kitchen", 89, 3);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Painting", "Decor", 10.99, 10);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("iHome", "Electronics", 99, 1);

select * FROM products;
