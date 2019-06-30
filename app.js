const mysql = require('mysql');
const inquirer = require('inquirer');
var Table = require('cli-table');
var displayTable = require('./displayConstructor.js');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "@Apartment7",
    database: "bamazon_db"
});

connection.connect(function(err, res){
    if (err) throw err;
});
// Display products database using a table made with the npm package cli-table2
// then Prompt the user to determine item and quantity they want to purchase
var displayForUser = function() {
	var display = new displayTable();
	connection.query('SELECT * FROM products', function(err, results){
		display.displayInventoryTable(results);
		purchaseItem();
	});
}

// Prompt user to enter id and quantity they wish to purchase
var purchaseItem = function() {
	console.log('\n  ');
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: " Enter the Item ID of the product you want to purchase",

	}, {
		name: "quantity",
		type: "input",
		message: " Enter the quantity you want to purchase",

	}]).then(function(answer) {
		// Query the database for info about the item including the quantity currently in stock. 
		connection.query('SELECT ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ?', {ItemID: answer.id}, function(err,res) {
			
		console.log('\n  You would like to buy ' + answer.quantity + ' ' + res[0].ProductName + ' ' + res[0].DepartmentName + ' at $' + res[0].Price + ' each'
			);
			if (res[0].StockQuantity >= answer.quantity) {
				//If enough inventory to complete order, process order by updating database inventory and notifying customer that order is complete. 
				var itemQuantity = res[0].StockQuantity - answer.quantity;
				connection.query("UPDATE products SET ? WHERE ?", [
				{
					StockQuantity: itemQuantity
				}, {
					ItemID: answer.id
				}], function(err,res) {
					});	
				var cost = res[0].Price * answer.quantity;
				console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');
				// Order completed
				customerPrompt();
					
			} else {
				//If not enought inventory notify customer and prompt customer for desire to shop more
				console.log('\n  Sorry, Insufficient quantity to fulfill your order!\n');
				// Order not completed
				customerPrompt();
			}
		})
    });
}

var customerPrompt = function() {
    inquirer.prompt({
        name: "action",
        type: "list",

        message: " Would like to continue shopping?\n",
        choices: ["Yes", "No"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'Yes':
                displayForUser();
            break;

            case 'No':
                connection.end();
            break;
        }
    })
};

// Start app by Prompting the customer
customerPrompt();