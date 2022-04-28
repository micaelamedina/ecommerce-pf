import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import products from "../../../Info/productos.json";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../redux/actions-types";
var Carousel = require('react-responsive-carousel').Carousel;

export default function CardDetail() {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const {idProduct} = useParams();
	const productsCart = useSelector((state)=>state.cartItems);
	const productFilter = products.filter((e)=> parseInt(e.id_product) === parseInt(idProduct));
	// const [colorSelect, setColorSelect] = useState("");
	const [imagesRender, setImagesRender] = useState([]);
	const [sizesRender, setSizesRender] = useState([]);
	const { // URL
		name,
		price,
		description,
		is_offer,
		price_offer,
		variants,
	} = productFilter[0];

	const [productFilterCart, setProductFilterCart] = useState({
		name,
		price: is_offer?price_offer:price,
		color: "",
		size: ""
	})

	useEffect(()=>{
		setImagesRender(variants[0].ProductImages);
		setSizesRender(Object.keys(variants[0].Stocks));
	  },[variants])

	const handleQuantity = (e) => {
		e.preventDefault();
		if (e.target.name === "less") setQuantity(quantity - 1);
		if (e.target.name === "more") setQuantity(quantity + 1);
	};

	const colors = variants.map((e)=>e.ColorName);
	let sizes = variants.map((e)=>e.Stocks); //[{l:5 m:2 s:1}]
	let arr = sizes.map(e=>Object.keys(e));

	sizes = Object.keys(sizes);

	const handleChangeSelect = (event) => {
		event.preventDefault();
		// setColorSelect(event.target.value);
		let variantFilter = variants.find((e)=> e.ColorName === event.target.value);
		console.log(variantFilter)
		let keys = Object.keys(variantFilter.Stocks);
		setImagesRender(variantFilter.ProductImages);
		setSizesRender(keys);
		setProductFilterCart({
			...productFilterCart,
			[event.target.name]: event.target.value
		});
	};

	const handleAddCart = (event) => {
		event.preventDefault();
		dispatch(addProductToCart(productFilterCart));
	}

	return (
		<div>
				<h1>{name}</h1>
				<Carousel>
					{imagesRender.length ? imagesRender.map(image => (
						<div>
							<img key={image} src={image} alt="Img Product"/>
						</div>
					)) : null}
				</Carousel>
				<h3>Precio $ {price}</h3>
				<p>{description}</p>
				{is_offer?<h3>Precio de oferta $ {price_offer}</h3> : null}
				<h4>Variantes:</h4>
				<select name="color"  onChange={(e)=>handleChangeSelect(e)}>
					<option>Color</option>
					{
						colors.length?colors.map((color)=>(
							<option name="color" value={color}>{color}</option>
						)):<option>UNIQUE</option>
					}
				</select>
				<select name="size" onChange={(e)=>handleChangeSelect(e)}>
					<option>Talle</option>
						{sizesRender.length ? sizesRender.map(size => (
							<option name="size" value={size} key={size}>{size}</option>
						)) : null}
				</select>

				<button onClick={(e)=>handleAddCart(e)}>Agregar al carrito</button>
				{/* <button>UnCorazon:D</button>
				<h1>{name}</h1>
				{price_offer ? (
					<>
						<p>
							<s>{price}</s>
						</p>
						<strong>{price_offer}</strong>
					</>
				) : (
					<p>{price}</p>
				)}
			</div>

			<div>
				<h2>Disponible en</h2>
				{colors.map((el) => el.name)}
			</div>
			<div>
				<h2>Selecciona tu talla</h2>
				{sizes.map((el) => el.name)}
			</div>

			<div>
				<h2>Cantidad</h2>
				<div>
					<button onClick={handleQuantity} name={"less"}>
						-
					</button>
					<span>{quantity}</span>
					<button onClick={handleQuantity} name={"more"}>
						+
					</button>
				</div>
				{/* <h5>Hay {stock} productos en stock</h5> */}
			{/* </div>

			<div>
				<h2>Reviews</h2>
			</div>

			<div>
				<h2>Productos relacionados</h2>
				<div>
					{relatedProducts.forEach((el) => {
						return (
							<Cards
								name={el.name}
								price={el.price}
								ofertPrice={el.price_offer}
								category={el.category}
								image={el.image}
								id={el.id}
							/>
						);
					})}
				</div>
			</div> */} 
		</div>
	);
}
