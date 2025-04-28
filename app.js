require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postModel = require('./models/post.mode')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
	try {
		const allPost = await postModel.find()
		res.status(200).json(allPost)
	} catch (error) {
		res.status(500).json(error)
	}
})

app.post('/', async (req, res) => {
	try {
		const { title, body } = req.body
		const newPost = await postModel.create({ title, body })
		res.status(201).json(newPost)
	} catch (error) {
		res.status(500).json(error)
	}
})

app.delete('/:id', (req, res) => {
	const { id } = req.params
	res.send(id)
})

app.put('/:id', (req, res) => {
	const { id } = req.params
	const body = req.body

	res.json({ id, body })
})

const PORT = process.env.PORT || 8080

const botstrap = async () => {
	try {
		await mongoose
			.connect(process.env.DB_URL)
			.then(() => console.log('Connected DB'))
		app.listen(PORT, () =>
			console.log(`Listening on - http://localhost:${PORT}`)
		)
	} catch (error) {
		console.log(`Error connecting with DB:${error} `)
	}
}

botstrap()
