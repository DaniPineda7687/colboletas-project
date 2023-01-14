import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import './CategoriesEvent.css'
const CategoriesEvent=({selectUser})=>{
    const[userCategory, setUserCategory]=useState(selectUser?selectUser:"");
    const[categories, setCategories]= useState([]);
    const getCategories = async()=>{
        const {data} = await axiosInstance.get(`categories/`);
        setCategories(data);
    }
    useEffect(()=>{
        getCategories();
    },[])   
    
    const handleCategorySelect=(e)=>{
        setUserCategory(e.currentTarget.dataset.idcategory)
    }
    return(
        <div className="event-categories-container">
            <p className="title-secondary">Categorias</p>
            <div className="event-categories">
                {
                    categories.map(category=>{
                        return(
                            <Link to={`/categories/${category.idCategory}`} data-idcategory={category.idCategory} key={category.name} onClick={handleCategorySelect} className="category-link">
                                <div className={`category-container ${userCategory===category.idCategory ? "category-selected" : ""}` }>
                                    <p className="category-icon">{category.icon}</p>
                                    <p className="category-name">{category.name}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default CategoriesEvent;