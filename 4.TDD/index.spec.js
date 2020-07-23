const app = require('./index');
const request = require('supertest');

// 테스트 수트 만들기
describe('GET /users는 ', () => {
    it('...', (done) => {   // 우리가 만든 서버는 다 비동기로 동작하기 때문에 비동기에 대한 처리로 done이라는 콜백함수를 넣음
        request(app)
            .get('/users')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })
})