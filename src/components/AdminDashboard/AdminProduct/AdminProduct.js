import React from 'react'
import './AdminProduct.css'
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

function AdminProduct({name,price,thumb,cate,onDelete}) {
    return (
        <div className="adminProduct">
            <div className="thumbAdmin">
            <img src={thumb} alt={name}/>
            </div>

            <div className="name__adminProduct">{name}</div>

            <div>{price}</div>

            <div>{cate}</div>

            <div>
                <IconButton onClick={()=>onDelete()}>
                  <DeleteRoundedIcon/>
                </IconButton>
            </div>                 

        </div>
    )
}

export default AdminProduct
