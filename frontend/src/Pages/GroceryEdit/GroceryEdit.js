import React, { useEffect, useState } from 'react'
import classes from './groceryEdit.module.css'
import { useForm } from 'react-hook-form'
import { add, getGroceryById, update } from '../../Services/groceryServices'
import Title from '../../Components/Title/Title'
import InputContainer from '../../Components/InputContainer/InputContainer'
import Input from '../../Components/Input/Input'
import Buttons from '../../Components/Buttons/Buttons'
import { uploadImage } from '../../Services/uploadService'
import toast from 'react-hot-toast'



export default function GroceryEdit({groceryID, toggle}) {
    
    const [groceryId, setGroceryId] = useState(groceryID)
    const [imageUrl, setImageUrl] = useState()
    const isEditMode = !!groceryId


    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm()

    useEffect(()=>{

      if(groceryId){
          
          getGroceryById(groceryId).then(grocery =>{
              if(!grocery) return
              reset(grocery)
              setImageUrl(grocery.imageUrl)
          })

      }
      else {
        reset({})
      }
    }, [groceryId])


    const submit = async groceryData =>{
        const grocery = {...groceryData, imageUrl}

        if (isEditMode){
            await update(grocery)
            toast.success(`Grocery "${grocery.name}" updated Successfully`)
            return
        }else{

            const newGrocery = await add(grocery)
            toast.success(`Grocery "${grocery.name}" successfully added`)
            setGroceryId(newGrocery.id)
        }

    }

    const upload = async event => {
        setImageUrl(null)
        const imageUrl = await uploadImage(event)
        setImageUrl(imageUrl)

    }

    return <div className={classes.modal}>
        <div className={classes.modal_content}>
            
        <button onClick={toggle} className={classes.close}>X</button>
        
            <Title title={isEditMode ? 'Edit Grocery' : 'Add Grocery'} />
            <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate> 
                <InputContainer label="Select Image">
                    <input type="file" onChange={upload} accept='image/jpeg, image/png'/>
                </InputContainer>

                {
                    imageUrl && <a href={imageUrl} className={classes.image_link} target='blank'>
                        <img src={imageUrl} alt='Uploaded' />
                    </a>
                }

                <Input type="text" 
                    label="Name" 
                    {...register('name', {required: true, minLength: 5})} 
                    error={errors.name}    
                />

                <Input type="number" 
                    label="Price" 
                    {...register('price', {required: true})} 
                    error={errors.price}    
                />

                <Input type="number" 
                    label="Stock" 
                    {...register('stock', {required: true})} 
                    error={errors.stock}    
                />

                <Input type="text" 
                    label="Tags" 
                    {...register('tags')} 
                    error={errors.tags}    
                />

            <select 
                className={classes.select_location}
                label="Location" 
                {...register('location', { required: true })} 
                error={errors.location}
            >
                <option value="">Select a location</option>
                <option value="Island">Island</option>
                <option value="Mainland">Mainland</option>
            </select>

            <Input type="text" 
                    label="Market" 
                    {...register('market', {required: true, minLength: 2})} 
                    error={errors.market}    
            />

            <Input type="text" 
                    label="Shop" 
                    {...register('shop', {required: true, minLength: 5})} 
                    error={errors.shop}    
            />
            <Input type="text" 
                    label="Other grocery Information" 
                    {...register('otherInformation', {required: true, minLength: 5})} 
                    error={errors.otherInformation}    
            />
            <Buttons type='submit' text={isEditMode ? "Update" : "Create"} />
            </form>

        </div>
    </div>


}