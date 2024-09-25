import React from 'react'
import classes from './Thumbnails.module.css'
import { Link } from 'react-router-dom'
import StarRating from '../Rating/StarRating'
import Price from '../Price/Price'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



export default function Thumbnails({groceries}) {
    
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

function HeaderText({marketName}){
    return ( <h3 className={classes.market_title}>{marketName}</h3>)
}



  return  ( 
        <div className={classes.main_container}>
            <div>
                <h4> Hope it works Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ad?</h4>
                <h4> Hope it works Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos cum perspiciatis quam ipsum natus labore sit fugiat ab sequi unde.</h4>
                    <HeaderText marketName={'Main Land Market'} />

                <Carousel responsive={responsive}>
                {
                            groceries.map(goods => 
                        
                            <div key={goods.id}>
                                <Link to={`/goods/${goods.id}`}>
                                <img className={classes.image} src={`/Grocery/${goods.imageUrl}`} alt={goods.name} />
                                    <div className={classes.content}>
                                    
                                        <div className={classes.name}>{goods.name}</div>

                                        <span className={` ${classes.favourite} ${goods.favourite? "" : classes.not}`} > ❤</span>

                                        <div className={classes.stars}>
                                            <StarRating stars={goods.stars}/>
                                        </div>

                                        <div className={classes.grocery_item_footer}>
                                            <div className={classes.price}>{<Price price={goods.price}/>}</div>
                                            <div className={classes.stock}>{goods.stock}</div>
                                        </div>
                                        
                                    </div>
                            
                                </Link>
                            </div>
                        
                        )
                    }
                

                </Carousel>


            </div>

        </div>

)

}
