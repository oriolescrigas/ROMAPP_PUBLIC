import AWS from 'aws-sdk'

AWS.config.update({
    region: "eu-west-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const db = new AWS.DynamoDB.DocumentClient()
const Table = 'orders'

//const db_li = new AWS.DynamoDB.DocumentClient()
const Table_li = 'lineitems'

export {
    db,
    Table,
    Table_li
}