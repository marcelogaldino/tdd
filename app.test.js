const request = require('supertest')
const app = require('./app')

describe('Todo API', () => {
	it('GET /todos --> array todos', () => {
		return request(app)
			.get('/todos')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							name: expect.any(String),
							completed: expect.any(Boolean)
						})
					])
				)
			})
	})

	it('GET /todos/id --> specific todo by ID', () => {
		return request(app)
			.get('/todos/1')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						name: expect.any(String),
						completed: expect.any(Boolean)
					})
				)
			})
	})

	it('GET /todos/id --> 404 if not found', () => {
		return request(app)
			.get('/todos/9999')
			.expect(404)
	})

	it('POST /todos --> create todo', () => {
		return request(app)
			.post('/todos')
			.send({
				name: 'study test'
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						name: 'study test',
						completed: false
					})
				)
			})
	})

	it('POST /todos --> validates request body', () => {
		return request(app)
			.post('/todos')
			.send({
				name: 123
			})
			.expect(422)
	})

})