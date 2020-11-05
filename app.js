const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

// express templage engine
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

app.get('/search', (req, res) => {
  const restaurants = restaurantsList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

app.get('/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.filter(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurant: restaurant[0] })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log('Restaurant List Project Go live')
})