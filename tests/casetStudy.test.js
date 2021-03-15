const request = require('supertest')
const app = require('../src/app')

test('Verify Data Fetch', async (done) => {
    await request(app).post('/case-study').send({
        "startDate": "2016-12-30",
        "endDate": "2018-12-30",
        "minCount": 4000,
        "maxCount": 5002
    }).expect(200)
    done()
});