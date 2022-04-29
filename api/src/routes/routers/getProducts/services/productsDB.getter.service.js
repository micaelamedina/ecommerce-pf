const setDDBBproducts = require("./productsDB.setter.service");

const { Product, Category } = require("../../../../db");

async function getDDBBproducts(categoryId) {
	await setDDBBproducts(categoryId);

	return await Product.findAll({
		include: {
			model: Category,
			where: { id: categoryId },
			through: {
				attributes: [],
			},
		},
	});
}

module.exports = getDDBBproducts;