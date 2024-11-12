import { useEffect, useState } from 'react'
import classes from './groceryAdminPage.module.css'
import { Link, useParams } from 'react-router-dom'
import { deleteGroceryById, getAll, search } from '../../Services/groceryServices'
import NotFound from '../../Components/Not Found/NotFound'
import Title from '../../Components/Title/Title'
import Search from '../../Components/Search/Search'
import Price from '../../Components/Price/Price'
import toast from 'react-hot-toast'
import GroceryEdit from '../GroceryEdit/GroceryEdit'

export default function GroceryAdminPage() {
    const [groceries, setGroceries] = useState()
    const { searchTerm } = useParams()
    
    //Test
    const [modal, setModal] = useState(false)
    const [groceryID, getGroceryId] = useState()

    useEffect(()=>{
        loadGroceries()

    }, [searchTerm,modal])

    const loadGroceries = async () =>{
        const groceries = searchTerm ? await search(searchTerm) : await getAll()
        setGroceries(groceries)
    }

    const GroceriesNotFound = () => {
        if(groceries && groceries.length > 0) return

        return searchTerm ? 
        <NotFound linkRoute='/admin/groceries' message='Show All' />
        : <NotFound linkRoute='/dashboard' linkText='No Groceries FOund, Back to Dashboard'/>
    }

    const deleteGrocery =  async grocery => {
        const confirm = window.confirm(`Delete Grocery ${grocery.name}?`)
        if(!confirm) return

        await deleteGroceryById(grocery.id)

        toast.success(`"${grocery.name}" Has Been Removed!`)

        setGroceries(groceries.filter(eachGrocery => eachGrocery.id !== grocery.id))
    }

    //Test
    const toggleModal = (grocery = null) => {
        setModal(!modal)
       if(grocery) getGroceryId(grocery.id)
        else getGroceryId(null)
    }
 

  return  <div className='Day'>

   
        
            <div className={classes.container}>
                <div className={classes.list}>
                    <Title title="Manage Groceries" margin="1rem auto" />
                    <Search 
                        searchRoute='/admin/groceries/'
                        defaultRoute='/admin/groceries'
                        margin="1rem 0"
                        placeholder='Search for Grocery'
                    />
                    <Link onClick={()=> toggleModal(null)} className={classes.add_grocery}>
                        Add Groceries +
                    </Link>
                    <GroceriesNotFound />
                    {
                        groceries && groceries.map( grocery => (
                            <div key={grocery.id} className={classes.list_item}>
                                    <img src={grocery.imageUrl} alt={grocery.name}  />
                                    <Link to={'/grocery/'+ grocery.id}>{grocery.name}</Link>
                                    <Price price={grocery.price}/>
                                    <div className={classes.actions}>
                                        <Link onClick={()=>toggleModal(grocery)} >Edit</Link>
                                        <Link onClick={()=> deleteGrocery(grocery)}>Delete</Link>
                                    </div>
                                    
                            </div>
                        ))
                    }
                </div>
            </div>
                    {modal && (
            
                    <GroceryEdit groceryID={groceryID} toggle={toggleModal} />
                    )}
                        

        </div>
   
    
  
}
