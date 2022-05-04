const getAPIproductDetail = require("./productsDetailApiGetter");

const { ProductDetail, Product } = require("../db");

async function setDDBBproducts(productId) {
	// Bringing details from API
	const productDetail = await getAPIproductDetail(productId);

	if (productDetail.name) {
		// Looking for product on Products table
		// for bringing isInStock & stock
		let productWithStock = await Product.findByPk(productId).catch((e) =>
			console.log(e),
		);

		// Creating on DDBB product details with stock
		const [newProduct, _created] = await ProductDetail.findOrCreate({
			where: {
				id: productDetail.id,
				name: productDetail.name,
				description: productDetail.description,
				info: productDetail.info,
				gender: productDetail.gender,
				brandName: productDetail.brandName,
				images: productDetail.images,
				isOffertProduct: productDetail.isOffertProduct,
				previousPrice: productDetail.previousPrice,
				currentPrice: productDetail.currentPrice,
				color: productDetail.color,
				variants: productDetail.variants.map((brandSize) => {
					return {
						brandSize,
						isInStock: true,
						stock: 100,
					};
				}),
			},
		}).catch((e) => console.log(e));

		await newProduct.setProduct(productWithStock);
	}
}

module.exports = setDDBBproducts;
