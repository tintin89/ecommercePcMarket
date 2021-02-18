import React from 'react'
import './Checkout.css'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {selectCartItems,selectCartTotal} from './../../redux/Cart/cart.selector'
import {createStructuredSelector} from 'reselect'
import {removeCartItem, addProduct,reduceCartItem} from '../../redux/Cart/cart.actions';
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


const mapState = createStructuredSelector({
    cartItems:selectCartItems,
    total:selectCartTotal
})

function Checkout() {
    const dispatch = useDispatch();
    const {cartItems,total} = useSelector(mapState);
    const history = useHistory();

    const handleRemoveItem = (documentID) =>{
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddItem = (product)=>{
        dispatch(addProduct(product))
    }

    const handleReduceItem = (product) =>{
        dispatch(reduceCartItem(product))
    }

    
    return (
        <div className="checkout">
            <h2>Chequear Compra</h2>
            <div className="header__checkout">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Precio</span>
                <span>Quitar</span>
            </div>
            <div className="products__checkout">
                {
                  cartItems.length > 0 ? (
                    cartItems.map((item,index)=>{
                        return (
                            <div key={index} className="product__checkout">

                                <div className="product__checkoutField">
                                   <div className="product__checkoutImg__container">
                                     <img src={item.productThumbnail} alt=""/>
                                    </div>
                                   <span className="product__checkoutProductName">{item.productName}</span>
                                </div>

                                <div className="product__checkoutField">
                                    <span onClick={()=>handleReduceItem(item)} className="removeQuantity">{'<'}</span>
                                       {item.quantity}
                                    <span onClick={()=>handleAddItem(item)} className="addQuantity">{'>'}</span>
                                </div>

                                   <div className="product__checkoutField">
                                    {item.productPrice}
                                    </div>

                                <div className="product__checkoutField">
                                <IconButton onClick={()=>handleRemoveItem(item.documentID)}>
                                    <DeleteRoundedIcon/>
                                </IconButton>
                                </div>
                                                                
                            </div>
                        )
                    })
                  ) :
                  <p>No tienes Productos en tu Carrito</p>
                }

            </div>

            <div className="total__checkout">
                Total:<span>${total}</span>              
            </div>

            <div className="buttons__checkout">
                <button onClick={()=>history.push('/buscar')}>Continuar Comprando</button>
                <button>Chequear</button>
            </div>
            
        </div>
    )
}

export default Checkout
