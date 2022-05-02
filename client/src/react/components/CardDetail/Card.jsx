import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./CardDetail.module.css";
import { addProductToCart } from "../../../redux/actions-types";

export default function Card({
	id,
	name,
	description,
	gender,
	brand,
	images,
	previousPrice,
	isOffertProduct,
	currentPrice,
	variants,
}) {
	const dispatch = useDispatch();
	const [imageCurrent, setImageCurrent] = useState("");
	const sizes = variants.map((e)=>e.brandSize);
	let colours = variants.map((e)=>e.color);
	let set = new Set(colours);
	colours = [...set];

	const [productToCart, setProductToCart] = useState({
		name,
		image: images[0],
		currentPrice,
		color: "",
		brandSize: "",
		quantity: 1,
		id
	});

	useEffect(() => {
		setImageCurrent(`https://${images[0]}`);
	}, [images]);

	const handleImgChange = (event) => {
		event.preventDefault();
		setImageCurrent(event.target.src);
	};

	const handleAddCart = (event) => {
		event.preventDefault();
		dispatch(addProductToCart(productToCart));
	};

	const handleChangeSelect = (event) => {
		event.preventDefault();
		if (event.target.name === "color") {
			setProductToCart({
				...productToCart,
				color: event.target.value,
			});
		} else if (event.target.name === "size") {
			setProductToCart({
				...productToCart,
				brandSize: event.target.value,
			});
		}
	};

	const handleClick = (event) => {
		event.preventDefault();
		if(event.target.value === "-") {
			setProductToCart({
				...productToCart,
				quantity: productToCart.quantity - 1,
			
			});
		} else {
			setProductToCart({
				...productToCart,
				quantity: productToCart.quantity + 1,
			
			});
		};
	};


	return (
		<div className={style.cardDetailContainer}>
			<div className={style.cardDetailImgContainer}>
				<div>
					{images.length
						? images.map((image) => (
								<div key={image}>
									<img
										className={style.cardCarouselImg}
										src={`https://${image}`}
										alt='Img Product'
										onClick={(e) => handleImgChange(e)}
									/>
								</div>
						  ))
						: null}
				</div>
			</div>
			<div>
				<img
					className={style.cardPrimaryImg}
					src={imageCurrent}
					alt='Img Principal'
				/>
			</div>
			<h3>{name}</h3>
			<p>{description}</p>
			<h4>Género:</h4>
			<h4>{gender}</h4>
			<h4>Marca:</h4>
			<h4>{brand}</h4>

			<h4>Precio</h4>
			{isOffertProduct ? (
				<div>
					<h5>Precio anterior: {previousPrice}</h5>
					<h5>Precio de oferta: {currentPrice}</h5>
				</div>
			) : (
				<h5>{currentPrice}</h5>
			)}

			<h4>Color:</h4>
			<select name='color' onChange={(e) => handleChangeSelect(e)}>
				<option>Color</option>
				{colours.length?colours.map((e)=>(
					<option key={e} value={e} name={e}>{e}</option>
				)):null}
			</select>

			<h4>Talle:</h4>
			<select name='size' onChange={(e) => handleChangeSelect(e)}>
				<option>Talle</option>
				{sizes.length?sizes.map((e)=>(
					<option key={e} value={e} name={e}>{e}</option>
				)):null}
			</select>
			<div>
				<button onClick={(e)=>handleClick(e)} value="-" disabled={productToCart.quantity <= 1 ? true : false}>-</button>
				<p>{productToCart.quantity}</p>
				<button onClick={(e)=>handleClick(e)} value="+">+</button>
			</div>
			<button onClick={(e) => handleAddCart(e)}>Agregar al carrito</button>
		</div>
	);
};

// return (
//     <div className={style.cardDetailContainer}>
//         <div className={style.cardDetailImgContainer}>
//             {/* <Carousel>
//                 {imagesRender.length
//                     ? imagesRender.map((image) => (
//                             <div key={image}>
//                                 <img
//                                     className={style.cardDetailImg}
//                                     src={image}
//                                     alt='Img Product'
//                                 />
//                             </div>
//                       ))
//                     : null}
//             </Carousel> */}
//             <div>
//                 {imagesRender.length
//                     ? imagesRender.map((image) => (
//                             <div key={image}>
//                                 <img
//                                     className={style.cardCarouselImg}
//                                     src={image}
//                                     alt='Img Product'
//                                     onClick={(event) => handleImgChange(event)}
//                                 />
//                             </div>
//                       ))
//                     : null}
//             </div>
//             <div>
//                 <img
//                     className={style.cardPrimaryImg}
//                     src={imageCurrent}
//                     alt='Img Principal'
//                 />
//             </div>
//         </div>

//         <div>
//             <h1>{name}</h1>
//             <h3>Precio $ {isOffertPrice?previousPrice:currentPrice}</h3>
//             <p>{description}</p>
//             {isOffertPrice ? <h3>Precio de oferta $ {currentPrice}</h3> : null}
//             <h4>Variantes:</h4>
//             <select name='color' onChange={(e) => handleChangeSelect(e)}>
//                 <option>Color</option>
//                 {colors.length ? (
//                     colors.map((color) => (
//                         <option key={color} name='color' value={color}>
//                             {color}
//                         </option>
//                     ))
//                 ) : (
//                     <option>UNIQUE</option>
//                 )}
//             </select>
//             <select name='size' onChange={(e) => handleChangeSelect(e)}>
//                 <option>Talle</option>
//                 {sizesRender.length
//                     ? sizesRender.map((size) => (
//                             <option name='size' value={size} key={size}>
//                                 {size}
//                             </option>
//                       ))
//                     : null}
//             </select>

//             <button onClick={(e) => handleAddCart(e)}>Agregar al carrito</button>
//         </div>
//         {/* <button>UnCorazon:D</button>

//             <h1>{name}</h1>
//             {price_offer ? (
//                 <>
//                     <p>
//                         <s>{price}</s>
//                     </p>
//                     <strong>{price_offer}</strong>
//                 </>
//             ) : (
//                 <p>{price}</p>
//             )}
//         </div>

//         <div>
//             <h2>Disponible en</h2>
//             {colors.map((el) => el.name)}
//         </div>
//         <div>
//             <h2>Selecciona tu talla</h2>
//             {sizes.map((el) => el.name)}
//         </div>

//         <div>
//             <h2>Cantidad</h2>
//             <div>
//                 <button onClick={handleQuantity} name={"less"}>
//                     -
//                 </button>
//                 <span>{quantity}</span>
//                 <button onClick={handleQuantity} name={"more"}>
//                     +
//                 </button>
//             </div>
//             {/* <h5>Hay {stock} productos en stock</h5> */}
//         {/* </div>

//         <div>
//             <h2>Reviews</h2>
//         </div>

//         <div>
//             <h2>Productos relacionados</h2>
//             <div>
