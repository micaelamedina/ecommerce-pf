import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDetails } from '../../../../redux/actions-types';

export default function UpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDetails(productId));
  }, [dispatch, productId]);

  const productToUpdate = useSelector((state)=>state.details);
  const {name, description, images, previousPrice, isOffertPrice, currentPrice, brandName, category, info, variants} = productToUpdate;

  console.log(productId);
  console.log(productToUpdate)

  let initialState = {
    name: "",
    description: "",
    images: [],
    previousPrice: 0,
    isOffertPrice: false,
    currentPrice: 0,
    colour: "",
    gender: "",
    brandName: "",
    category: [],
    info: {
      aboutMe: "",
      sizeAndFit: "",
      careInfo: "",
    },
    variants: [],
  }

  const [input, setInput] = useState(initialState);
  return (
    <div>

     <div>
        <h4>Nombre</h4>
        <input
          placeholder="Nombre del producto" 
          value={input.name !== "" ? input.name : name} 
          name="name"
          type="text"
        />
        <h4>Descripcion</h4>
        <input
          placeholder="Nombre del producto" 
          value={input.description !== "" ? input.description : description} 
          name="name"
          type="text"
        />
        {
          images.length >= 1?images.map((e, index)=> {
            return(
              <div key={index}>
                  <button>X</button>
                  <img 
                    src={`https://${e}`}
                    alt="Img product"
                  />
              </div>
            )
          }):<p>Hola</p>
        }
        <div>

        </div>
      </div> 
    </div>
  );
};