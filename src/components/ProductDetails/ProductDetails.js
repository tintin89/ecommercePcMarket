import React,{useEffect} from 'react'
import './ProductDetails.css'
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {fetchProductStart,setProduct} from '../../redux/Products/products.actions'
import {addProduct} from '../../redux/Cart/cart.actions'

const mapState = state =>({
    product:state.productsData.product
})

function ProductDetails() {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const {product} = useSelector(mapState);

    const {
        productName,
        productPrice,
        productThumbnail,
        productCategory,
        description

    } = product

    useEffect(()=>{
        
        dispatch(
            fetchProductStart(productId)
        )

        return ()=>{
            dispatch(
                setProduct({})
            )
        }
    },[])

    const handleAddToCart = (product) =>{
        if(!product) return null;
        dispatch(
            addProduct(product)
        );
    }

    return (
        <div className="productDetails">

            <div className="imgContainer__productDetails">
            <img src={productThumbnail} alt={productName}/>
            </div>

            <div className="detailsBar__productDetails">
            <div className="basicDetails">
            <span>{productName}</span>
            <span>${productPrice}</span>
            </div>
            <div className="additionalDetails">
                <span>{productCategory}</span>
            </div>
            </div>

            <div className="separator__productsDetails"></div>

            <div className="description__productDetails">
                <span
                dangerouslySetInnerHTML={{__html:description}}
                />
            </div>

            <button onClick={()=>handleAddToCart(product)}>Añadir al Carrito</button>
            
            
        </div>
    )
}

export default ProductDetails
