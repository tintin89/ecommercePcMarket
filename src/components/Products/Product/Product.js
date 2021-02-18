import React from 'react'
import './Product.css'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {addProduct} from '../../../redux/Cart/cart.actions';

function Product(p) {
    const dispatch = useDispatch();
    const history = useHistory();

    const {documentID} = p;


    const handlePush = () =>{
        console.log(documentID);
        history.push(`/producto/${documentID}`);
    }

    const handleAddToCart = (product) =>{
        if(!product) return;
        dispatch(addProduct(product));


    }

    return (
        <div className="product">
            
            <img onClick={()=>handlePush()} className="product__img" src={p.productThumbnail} alt={p.productName}/>
        
            <div className="details__product">
            <span onClick={()=>handlePush()} className="product__name">{p.productName}</span>
            <span>${p.productPrice}</span>    
            </div>  
            
            <button onClick={()=>handleAddToCart(p)}>Añadir al Carrito</button>
                                
        </div>
    )
}

export default Product
