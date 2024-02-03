const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql2')
const axios = require('axios')
const port = 3000
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/api/trivia', async(req, res) => {
    try {
        const apiKey = process.env.API_KEY
        const apiUrl = 'https://api.api-ninjas.com/v1/exercises?type=cardio&difficulty=easy'

        const headers = {
            'X-Api-Key': apiKey,
        };

        const response = await axios.get(apiUrl, { headers })
        res.json(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})
app.post('/login', async(req, res) => {
    try {
        //console.log(req.body)
        await connection.connect((err) => {
            if (err) {
                console.log(err)
                res.status(500)
                res.render('server_error')
            } else {
                const username = req.body.username
                const password = req.body.password
                const values = [username, password]
                const query = `SELECT * FROM patient WHERE username=? AND password=?`
                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(500)
                        console.log(result)
                        res.render('server_error')
                    } else {
                        if (result.length > 0) {
                            res.render('home')
                        } else {
                            res.send('user does not exist')
                                //res.render('login')
                        }

                    }
                })
            }
        })




    } catch (err) {
        console.log(err)
    }
    // } finally {
    //     await connection.end()
    // }


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))