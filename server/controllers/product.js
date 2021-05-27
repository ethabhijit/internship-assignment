const Product = require("../models/product");

// Set the search query
exports.setSearchQuery = (req, res, next, query) => {
	req.query = query;
	next();
};

// Save new product in the DB
exports.addProduct = (req, res) => {
	const product = new Product(req.body);

	product.save((err, product) => {
		if (err) {
			return res.status(400).json({
				err: "Not able to save product!",
			});
		}
		res.json(product);
	});
};

// Get All products
exports.getAllProduct = (req, res) => {

	Product.find({
		$or: [
			{storeName: { $regex: req.query, $options: "i" }},
			{productName: { $regex: req.query, $options: "i" }},
		]
	}).exec((err, product) => {
		if (err) {
			return res.status(400).json({
				error: "No product found!",
			});
		}
		res.json(product);
	});
};
