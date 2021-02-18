import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchProductsStart} from '../../redux/Products/products.actions'
import {useHistory,useParams} from 'react-router-dom'
import './Products.css'
import Product from './Product/Product'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const mapState = ({productsData}) => ({
    productos:productsData.products
})

function Products() {
    const dispatch = useDispatch();
    const {productos} = useSelector(mapState);
    const {data,queryDoc,isLastPage} = productos;
    const history = useHistory();
    const {filterType} = useParams();

    
    useEffect(()=>{
        dispatch(fetchProductsStart({filterType}));

    },[dispatch,filterType])

    

    const handleFilter = e =>{
        const nexFilter = e.target.value;
        history.push(`/buscar/${nexFilter}`);

    }

    const handleLoadMore = () => {
         dispatch(fetchProductsStart({
            filterType,
            startAfterDoc:queryDoc,
            persistProducts:data   
         }))
    }
   
    return (
        <div className="products">
                <div className="operations__products">
                    <div className="select__products">
                        <select value={filterType} onChange={handleFilter} className="selectP">
                            <option value="">Todos</option>
                            <option value="componentes">Componentes</option>
                            <option value="PCs">Pcs</option>
                            <option value="perisfericos">Perisfericos</option>
                        </select>
                    </div>
                    <div className="search__products">
                        <input className="inputP"/>
                        <SearchRoundedIcon/>
                    </div>
                </div>  
                {
                    (!Array.isArray(data)|| data.length < 1) 

                         ?                  
                         
                            <div className="results__products">
                                <p>No se encontraron resultados</p>            
                            </div>
                         
                         :

                         <div className="results__products">
                         {
                             data.map((p,index)=>(
                                 <Product
                                  key={index}
                                  {...p}                                 
                                  />
                             ))
                         }
                     </div>
                    
                }

               
                {
                    !isLastPage && (
                    <button onClick={()=>handleLoadMore()} className="loadMore">Cargar Más</button>
                    )

                }
                
        </div>
    )
}

export default Products
