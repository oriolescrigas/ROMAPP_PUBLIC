import express from 'express'
import { createOrUpdate, deleteOrderById, getOrderById, readAllOrders, createOrUpdateLineItem, readAllLineItems, getLineItemsByCsId, deleteLineItemByCsId } from './db.js'

const router = express.Router()


// READ ALL Line Items
router.get('/lineitems', async(req, res) => {
    const { success, data } = await readAllLineItems()
    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get Line Items by Order ID
router.get('/lineitem/:cs_id', async(req, res) => {
    const { cs_id } = req.params
    const { success, data } = await getLineItemsByCsId(cs_id)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})

// Create Line Item
router.post('/lineitem', async(req, res) => {
    const { success, data } = await createOrUpdateLineItem(req.body)

    if(success){
        
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})

// Delete Line Item by Order Id
router.delete('/lineitem/:orderid', async (req, res) => {
    const { orderid } = req.params
    
    const { success } = await deleteLineItemByCsId(orderid)
    if (success) {
        const { success } = await deleteOrderById(orderid)

        if (success) {
            var url = process.env.PUBLIC_URL+"/";
            return res.redirect(url)
        }
        return res.status(500).json({ success: false, message: 'Error'})
    }
    return res.status(500).json({ success: false, message: 'Error'})
})

// READ ALL Orders
router.get('/orders', async(req, res) => {
    const { success, data } = await readAllOrders()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get Order by ID
router.get('/order/:id', async(req, res) => {
    const { id } = req.params
    console.log("id: "+id)
    const { success, data } = await getOrderById(id)
    console.log("succes: "+success)
    
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create Order
router.post('/order', async(req, res) => {
    //const item = req.body;
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        // Emit the 'new-item' event
        //socketio.emit('new-item', item);
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Update Order by ID
router.put('/order/:id', async(req, res) => {
    const order = req.body
    const { id } = req.params
    order.id = parseInt(id)

    const { success, data } = await createOrUpdate(order)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete Order by Id
router.delete('/order/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteOrderById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  



export default router