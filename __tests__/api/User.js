import { expect } from 'chai'
import supertest from 'supertest'

const url = 'http://localhost:4000'
const request = supertest(url)

const call = data =>
	request
		.post('/app')
		.set('Accept', 'application/json')
		.send(data)

describe('User - userDetails', () => {
	it('When user not exist, returns null', done => {
		const query = `
			query {
				userDetails {
					id
				}
			}
		`

		call({ query })
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				expect(JSON.parse(res.text)).to.deep.equal({
					data: {
						userDetails: null,
					},
				})
				done()
			})
	})
})

describe('User - initStatus', () => {
	it('When user not exist, creates user, create session, create default status + returns User', done => {
		const mockedDeviceName = 'Mocked Device'
		const query = `
				mutation {
					initSession(device:"${mockedDeviceName}") {
					    id,
						email,
						name,
						photoURL,
						sessions {
						  id,
						  device,
						  ip,
						  start,
						  end
						},
						statuses {
						  id,
						  name,
						  start,
						  end
						}
					}
				}
			`

		request
			.post('/app')
			.set('Accept', 'application/json')
			.send({ query })
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				done()
			})
	})
})
