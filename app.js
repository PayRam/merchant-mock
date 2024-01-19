const express = require('express')
const path = require('path')
const axios = require('axios')

const app = express()
const PORT = 8081 // Port for the merchant mock server

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname))) // Serve static files from the merchant_mock directory
app.use(express.json())

// Serve the mock merchant page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Handle the form submission by sending a POST request to the Payram server
app.post('/pay-with-payram', async (req, res) => {
  try {
    const { amount, currency, userId } = req.body
    const payramResponse = await axios.post(
      'http://localhost:2357/api/v1/payram-payment-session',
      {
        amount,
        currency,
        userId,
      }
    )
    console.log('Payram response:', payramResponse.data)
    // Redirect the user to the Payram payment page
    res.redirect(303, payramResponse.data.url)
  } catch (error) {
    console.error('Error submitting invoice to Payram:', error)
    res.status(500).send('Error processing payment.')
  }
})

// Webhook endpoint to receive notifications from Payram
app.post('/payram-webhook', async (req, res) => {
  const { invoice_id, reference_id, status, amount, currency, filled_amount, payment_info } = req.body

  console.log(
    'Received webhook for transaction:',
    invoice_id,
    'with reference:',
    reference_id,
    'and status:',
    status
  )
  // Here you would update your merchant's database and trigger any business logic
  // For example, confirming an order or updating an account balance

  // Respond to the Payram server to acknowledge receipt of the webhook
  res.status(200).send({ received: true })
})

app.listen(PORT, () => {
  console.log(`Merchant mock server running at http://localhost:${PORT}`)
})
