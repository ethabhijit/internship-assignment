const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		storeName: {
			type: String,
			required: true,
		},
		productName: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

productSchema.index({ storeName: "text", productName: "text" });

module.exports = mongoose.model("Product", productSchema);
