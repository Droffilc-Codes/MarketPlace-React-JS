import { connect, set } from 'mongoose'
import { sample_market_data } from '../data.js'
import { sample_market_users } from '../data.js'
import { UserModel } from '../models/user.model.js'
import { GroceryModel } from '../models/grocery.model.js'
import bcrypt from 'bcryptjs'
const PASSWORD_HASH_SALT_ROUNDS = 10

set('strictQuery', true)

export const dbconnect = async () =>{
    try{
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await seedUsers()
        await seedGroceries()
        console.log('connected successfully----')
    }catch(error){
        console.log(error)
    }
}

async function seedUsers(){
    const usersCount = await UserModel.countDocuments()
    if (usersCount > 0){
        console.log('Users seed is already done!')
        return
    }

    for(let user of sample_market_users) {
        user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS)
        await UserModel.create(user)
    }
    console.log('User seed is done')
}

async function seedGroceries(){
    const groceries = await GroceryModel.countDocuments()
    if(groceries > 0){
        console.log('Groceries seed is already done!')
        return
    }

    for (const grocery of sample_market_data){
        grocery.imageUrl = `/Grocery/${grocery.imageUrl}`
        await GroceryModel.create(grocery)
    }
    console.log('Groceries seed is done')
}