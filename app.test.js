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

	it('PUT /todos/id --> update todo', () => {
		return request(app)
			.put('/todos/1')
			.send({
				name: 'todo updated'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						name: 'todo updated',
						completed: false
					})
				)
			})
	})

	it('PUT /todos/id --> validates request body', () => {
		return request(app)
			.put('/todos/1')
			.send({
				name: 123
			})
			.expect(422)
	})

	it('PUT /todos/id --> 404 if not found', () => {
		return request(app)
			.put('/todos/999')
			.send({
				name: 'updated not found'
			})
			.expect(404)
	})

	it('DELETE /todos/id --> delete todo', () => {
		// jest.useFakeTimers();
		return request(app)
			.delete('/todos/1')
			.expect(204)
	})

	it('DELETE /todos/id --> 404 if not found', () => {
		return request(app)
			.delete('/todos/999')
			.expect(404)
	})

})