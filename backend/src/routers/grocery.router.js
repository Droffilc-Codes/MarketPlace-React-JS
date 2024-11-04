import { Router } from 'express'
import handler from 'express-async-handler'
import { GroceryModel } from '../models/grocery.model.js'
import admin from '../middleware/admin.mid.js'


const router = Router()

router.get('/', handler(async (req, res)=>{
    const groceries = await GroceryModel.find({})
    res.send(groceries)
}))


router.post('/', admin, handler(async (req, res)=>{
    const { name, price, stock, tags, location, market, imageUrl, shop, otherInformation} = req.body

    const grocery = new GroceryModel({
        name, 
        price, 
        stock, 
        tags: tags.split? tags.split(',') : tags, 
        location, 
        market, 
        imageUrl,
        shop, 
        otherInformation
    })

    await grocery.save()

    res.send(grocery)
}))


router.put('/', admin, handler(async (req, res)=>{
    const { id, name, price, stock, tags, location, market, imageUrl, shop, otherInformation} = req.body

    await GroceryModel.updateOne({_id: id}, 
        {
            name, 
            price, 
            stock, 
            tags: tags.split? tags.split(',') : tags, 
            location, 
            market, 
            imageUrl,
            shop, 
            otherInformation
        }
    )
    res.send()
}))


router.delete('/:groceryId', admin, handler(async (req, res)=>{
    const { groceryId } = req.params

    await GroceryModel.deleteOne({_id: groceryId})

    res.send()
}) )


router.get('/tags', handler(async (req, res)=>{
    const tags = await GroceryModel.aggregate([
        {
            $unwind: '$tags',
        },
        {
            $group: {
                _id: '$tags',
                count: {$sum: 1},
            },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count: '$count'
            }
        }
    ]).sort({ count: - 1})

    // const all = {
    //     name: 'All',
    //     count: await GroceryModel.countDocuments()
    // }

    // tags.unshift(all)


    res.send(tags)
}))




router.put('/changestock', handler(async (req, res) => {
    const items = req.body; // No destructuring, since req.body is already an array
    
    try {
        for (const item of items) {
            const grocery = await GroceryModel.findById(item.groceryId);

            if (!grocery) {
                return res.status(404).send({ message: 'Grocery not found!' });
            }

            // Check if stock is sufficient
            if (grocery.stock < item.quantity) {
                return res.status(400).send({ message: 'Insufficient stock for ' + grocery.name });
            }

            // Reduce stock
            grocery.stock -= item.quantity;

            // Save the updated grocery
            await grocery.save();
        }

        // Send success message once all items are processed
        res.send({ message: 'Stock updated successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating stock', error });
    }
}));





// Test stock redution end


router.get('/search/:searchTerm', handler(async (req, res)=>{
    const {searchTerm} = req.params
    const searchRegex = new RegExp(searchTerm, 'i')
    const grocery = await GroceryModel.find({ name: { $regex: searchRegex } })
    res.send(grocery)
}))

router.get('/tags/:tags', handler(async (req, res)=>{
    const {tags} = req.params

    const groceries = await GroceryModel.find({ tags:  tags })
    res.send(groceries)
}))


router.get('/:groceryId', handler(async (req, res)=>{
    const { groceryId } = req.params
    const groceries = await GroceryModel.findById(groceryId)
    res.send(groceries)
}))

export default router