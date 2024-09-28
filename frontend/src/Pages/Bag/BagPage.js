import React from 'react'
import { useBag } from '../../Hook/useBag/useBag'
import classes from './BagPage.module.css'
import Title from '../../Components/Title/Title'
import { Link } from 'react-router-dom'
import Price from '../../Components/Price/Price'

export default function BagPage() {

    const { bag, removeFromBag, changedQuantity } = useBag()

  return   <>
  <Title title="Your Bag" margin="1.5rem 0 0 2.5rem" />

    {bag && bag.items.length > 0 &&

        <div className={classes.container}>

            <ul className={classes.list}>
                {bag.items.map(item => (

                    <li key={item.grocery.id}>
                        <div>
                            <img
                              src={`/Grocery/${item.grocery.imageUrl}`}
                              alt={item.grocery.name}
                              />
                        </div>
                        <div>
                            <Link to={`/grocery/${item.grocery.id}`}>{item.grocery.name}</Link>
                        </div>

                        <div>
                            {/* <input value={item.quantity} onChange={e=> changeQuantity(item, Number(e.target.value))}/> */}
                            <input value={item.quantity} onChange={e => changedQuantity(item, Number(e.target.value))} />
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

                    <div className={classes.total_price}>
                        <Price price={bag.totalPrice} />
                    </div>
                </div>
                <Link to="/checkout">Proceed to Checkout</Link>
            </div>

        </div>
    }

  </>
  
}
