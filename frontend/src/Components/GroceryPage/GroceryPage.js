import React, { useEffect, useState } from 'react'
import classes from './GroceryPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getGroceryById } from '../../Services/groceryServices'
import StarRating from '../Rating/StarRating'
import Tags from '../Tags/Tags'
import Price from '../Price/Price'
import { useBag } from '../../Hook/useBag/useBag'
import NotFound from '../Not Found/NotFound'

export default function GroceryPage() {
    const [grocery, setGrocery] = useState(null)
    const {id} = useParams()
    const { addToBag } = useBag()
    const navigate = useNavigate()

    const handleAddToBag = ()=>{
        addToBag(grocery)
        navigate('/bag')
    }


    useEffect(()=>{
        getGroceryById(id).then(setGrocery)
    },[id])

  return  <>
      {!grocery ? (<NotFound message='Grocery Item Not Found!' linkText='Back to Home Page' /> ) : ( <div className={classes.container}>
        <img className={classes.image} 
            src={`${grocery.imageUrl}`} alt={grocery.name}
        />
        <div className={classes.details}>
             {/* Add Shop Name */}
             <div className={classes.location}>
                <h4 className={classes.shop}>{grocery.location}, {grocery.shop}'s Shop</h4>
             </div>
            <div className={classes.header}>
                <span className={classes.name}>{grocery.name}</span>
                <span className={`${classes.favourite} ${grocery.favourite ? '' : classes.not}`}>❤</span>
            </div>

            <div className={classes.rating}>
                <StarRating stars={grocery.stars} size={25} />
            </div>

            <div className={classes.tags}>
                {grocery.tags && 
                    <Tags tags={grocery.tags.map(tag => ({name: tag}))} groceryPage={true} />
                }
            </div>
            
            <div className={classes.price}>
                <Price price={grocery.price}/>
            </div>

            <div className={classes.stock}>
                {grocery.stock}
            </div>

            <button onClick={handleAddToBag}>Add to Bag</button>

        </div>
      </div>)}
    </>
  
}
