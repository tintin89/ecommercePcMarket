import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams,useHistory} from 'react-router-dom'
import {addProductStart,fetchProductsStart,deleteProductStart} from '../../redux/Products/products.actions'
import './AdminDashboard.css'
import AdminProduct from './AdminProduct/AdminProduct';
import Modal from '../Modal/Modal';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CKEditor from 'ckeditor4-react'

const mapState = ({productsData}) => ({
    productos:productsData.products
  })


function AdminDashboard() {
    const [modal,setModal] = useState(true);
    const {productos} = useSelector(mapState); 
    const {data,queryDoc,isLastPage} = productos;
    const {filterType} = useParams();
    const dispatch = useDispatch(); 
    const history = useHistory();
    const [productCategory, setProductCategory] = useState('componentes');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [description,setDescription] = useState('');

    const handleToogleModal=()=>{
        setModal(!modal);
    }

    useEffect(()=>{
        dispatch(fetchProductsStart({filterType}));

    },[dispatch,filterType])

    const handleFilter = e =>{
        const nexFilter = e.target.value;
        history.push(`/admin/${nexFilter}`);

    }

    const handleLoadMore = () => {
        dispatch(fetchProductsStart({
           filterType,
           startAfterDoc:queryDoc,
           persistProducts:data   
        }))
   }

      const resetForm =()=>{
        setModal(true);
        setProductCategory('componentes');
        setProductName('');
        setProductThumbnail('');
        setProductPrice(0);
        setDescription('');
      }
      const handleSubmit = e => {
        e.preventDefault();  
        dispatch(
          addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            description
          }));
          resetForm();
      };

   
    return (
        <div className="adminDashboard">
            <Modal hideModal={modal} toggleModal={()=>handleToogleModal()}>
                <form className="form__admin" onSubmit={handleSubmit}>
                <div className="selectContainerAdmin">
                      <label>Categoría</label>
                        <select value={productCategory}  onChange={e => setProductCategory(e.target.value)}>
                            <option value="componentes" name="componentes">Componentes</option>
                            <option value="PCs" name="PCs">PCs</option>
                            <option value="perisfericos" name="perisfericos">Perisfericos</option>
                        </select>
                    </div>
                    <input value={productName} onChange={e => setProductName(e.target.value)} type="text" name="name" placeholder="Nombre del producto"/>
                    <input value={productThumbnail} onChange={e => setProductThumbnail(e.target.value)} type="url" name="thumb" placeholder="Url de la imagen"/>
                    <input
                    min="0.00"
                    max="10000.00"
                    step="0.01" 
                    value={productPrice} onChange={e => setProductPrice(e.target.value)} type="number" name="price" placeholder="Precio"/>
                    <CKEditor
                    onChange={evt=>setDescription(evt.editor.getData())}
                    />
                    <br/>
                    <button type="submit">Registrar Producto</button>
                    
                </form>
            </Modal>
            <div className="navBar__admin">
            <div className="navBar__adminLeftOp">
             Adicionar Producto   
            <IconButton onClick={()=>handleToogleModal()}>
             <AddCircleRoundedIcon />
             </IconButton>
            </div>

            <div className="navBar__adminRightOp">           
            <div className="selectContainerAdmin">
                        <select value={filterType} onChange={handleFilter}>
                            <option value="">Todos</option>
                            <option value="componentes">Componentes</option>
                            <option value="PCs">Pcs</option>
                            <option value="perisfericos">Perisfericos</option>
                        </select>
                    </div>
                    <div className="inputSearch__navBarAdmin">
                        <input/>
                        <SearchRoundedIcon/>
                    </div>
            </div>

            </div>
            {
                   (!Array.isArray(data)|| data.length < 1) 

                   ?                  
                   
                      <div className="results__products">
                          <p>No se encontraron resultados</p>            
                      </div>
                   
                   :
                   <div className="products__admin">
                   {
                       productos.data.map((p,index)=>(
                           <AdminProduct
                           key={index}
                           name={p.productName}
                           price={p.productPrice}
                           thumb={p.productThumbnail}
                           cate={p.productCategory} 
                           onDelete={()=>dispatch(deleteProductStart(p.documentID))}                       
                           />
                       ))
                   }
   
                   {
                       !isLastPage && (
                       <button onClick={()=>handleLoadMore()} className="loadMore">Cargar Más</button>
                       )
   
                    }
                               
               </div>
            }

          
           
            
        </div>
    )
}

export default AdminDashboard
