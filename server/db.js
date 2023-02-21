import {db, Table, Table_li} from './db.config.js'

// Create or Update orders
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: Table,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read all order
const readAllOrders = async()=>{
    const params = {
        TableName: Table
    }

    try{
        const { Items = [] } = await db.scan(params).promise()

        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Orders by ID
const getOrderById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete Order by ID
const deleteOrderById = async(value, key = 'id' ) => { 
    const params = {
        TableName: Table,
        Key: {
            [key]: value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}

// Read all order
const readAllLineItems = async()=>{
    const params = {
        TableName: Table_li
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Create or Update Line Item
const createOrUpdateLineItem = async (data = {}) =>{
    const params = {
        TableName: Table_li,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read Line Items by Order ID
const getLineItemsByCsId = async (value) => {
    const params = {
        TableName: Table_li,
        KeyConditionExpression: "cs_id = :id",
        ExpressionAttributeValues: {
            ':id': value
        }
    }
    try {
        const result =  await db.query(params).promise()
        return { success: true, data: result }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete Line Item by Order ID
const deleteLineItemByCsId = async(value, key = 'cs_id' ) => { 
    /*const params = {
        TableName: Table_li,
        Key: {
            [key]: value,
            itemid: "item-1"
        }
    }*/
    
    const { success, data } = await getLineItemsByCsId(value)
    if (success) {
        data.Items.map(async function (item){
            
            const params = {
                TableName: Table_li,
                Key: {
                    [key]: value,
                    itemid: item.itemid
                }
            }
    
            try {
                await db.delete(params).promise()
                return {  success: true }
        
            } catch (error) {
                return{ success: false }
            }
        })
        
        return {  success: true }
    }
    console.log('Error getting Line Items list')
    return res.status(500).json({ success: false })

    
    /*try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }*/
}

export {
    createOrUpdate,
    readAllOrders,
    getOrderById,
    deleteOrderById,
    createOrUpdateLineItem,
    readAllLineItems,
    getLineItemsByCsId,
    deleteLineItemByCsId
}