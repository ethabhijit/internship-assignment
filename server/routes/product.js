const express = require("express");
const router = express.Router();

const {
	setSearchQuery,
	getAllProduct,
	addProduct,
} = require("../controllers/product");

router.param("searchQuery", setSearchQuery);

router.get("/products/:searchQuery", getAllProduct);
router.post("/add/product", addProduct);

module.exports = router;