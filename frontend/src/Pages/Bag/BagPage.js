import React from 'react'
import { useBag } from '../../Hook/useBag/useBag'
import classes from './BagPage.module.css'
import Title from '../../Components/Title/Title'
import { Link } from 'react-router-dom'
import Price from '../../Components/Price/Price'
import NotFound from '../../Components/Not Found/NotFound'

export default function BagPage() {

    const { bag, removeFromBag, changedQuantity } = useBag()
    console.log(bag)
  return   <>
  <Title title="Your Bag" margin="1.5rem 0 0 2.5rem" />

    {bag && bag.items.length === 0 ? (<NotFound message='Your Shopping Bag is empty!' />) : (

        <div className={classes.container}>

            <ul className={classes.list}>
                {bag.items.map(item => (

                    <li key={item.grocery.id}>
                        <div>
                            <img
                              src={`${item.grocery.imageUrl}`}
                              alt={item.grocery.name}
                              />
                        </div>
                        <div>
                            <Link to={`/grocery/${item.grocery.id}`}>{item.grocery.name}</Link>
                        </div>

                        <div>
                            <input type='number' value={item.quantity} onChange={e => changedQuantity(item, Math.max(1, Number(e.target.value)))} />
                            
                        </div>

                        <div>
                            <Price price={item.price}/>
                        </div>

                        <div>
                            {item.stock}
                        </div>

                        <div>
                            <button className={classes.remove_button} onClick={() => removeFromBag(item.grocery.id)}>Remove </button>
                            
                        </div>
                    </li>
                ))}
            </ul>

            <div className={classes.checkout}>
                <div>
                    <div className={classes.grocery_count}>{bag.totalCount}</div>

                    <div className={classes.grocery_subtotal}> <Price price={bag.subTotal} /></div>

                    <div className={classes.delivery}> <Price price={bag.delivery}/></div>

                    <div className={classes.total_price}><Price price={bag.totalPrice} /></div>
                </div>
                <Link to="/checkout">Proceed to Checkout</Link>
            </div>

        </div>
        
    )
    
    }
     {/* Start */}
     <div className={classes.Notes}>
        <h5 className={classes.Notes_text}>
            Note: Delivery fee is based on how far apart the points of purchase.
            <p>Items bought only from one location, e.g. Island markets will be charged less <Price price={3000}/>  compared to those bought from shops in Island and Mainland  markets <Price price={5000}/>
            </p>
            <p>For each Item, we charge extra <Price price={80}/> or <Price price={40}/> depending on point of purchase</p>
        </h5>  
    </div>

  </>
  
}
