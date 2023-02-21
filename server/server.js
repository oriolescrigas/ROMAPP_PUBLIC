import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import order from './routes.js'
import express from 'express'
import cors from 'cors'

dotenv.config()

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express()
const port = 4242

app.use(cors())

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.get('/config', (req, res) => {
    res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
})

app.get('/get-products', async (req, res) => {
    const products = await stripe.products.list({
        active: true,
        limit: 3,
    })

    res.json(products.data);
})

app.post('/create-checkout-session', async (req, res) => {

    const adjustableQuantitySetting = {
        enabled: true,
        minimum: 0,
        maximum: 5,
    }

    //const priceList = [process.env.PRICE1, process.env.PRICE2, process.env.PRICE3];
    const priceList = ["price_1MDkfIHY2Tk70IUNi2YHJcuG", "price_1MDkdoHY2Tk70IUN99DhaLT5", "price_1MDkaRHY2Tk70IUN5Qm63Oq3"];

    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.PUBLIC_URL}/cancel`,
        payment_method_types: ['card'],
        invoice_creation: {enabled: true},
        line_items: priceList.map(priceId => ({price: priceId, quantity: 1, adjustable_quantity: adjustableQuantitySetting})),
        mode: 'payment',
    })
    res.json({id: session.id});
})

app.get('/get-checkout-session', async (req, res) => {
    const {id} = req.query;
    // Mirar de llistar i agafarne alguna que tingui més camps omplerts per a crear la factura
    const session = await stripe.checkout.sessions.retrieve(
        id,
        { expand: ['payment_intent','line_items']}
    );

    const invoice = await stripe.invoices.retrieve(
        session.invoice
    );

    // Getting invoice URL
    session.url = invoice.hosted_invoice_url;

    res.json(session);
})

app.use(bodyParser.json())
app.use('/api', order)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})