const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users는 ', () => {
    describe('성공시', () => {
        it('유저 객체를 담은 배열로 응답한다. ', (done) => {   // 우리가 만든 서버는 다 비동기로 동작하기 때문에 비동기에 대한 처리로 done이라는 콜백함수를 넣음
            request(app)
                .get('/users')
                .end((err, res) => {
                    console.log(res.body);
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        });
        it('최대 limit 갯수만큼 응답한다', (done) => {
            request(app)
            .get('/users?limit=2')
            .end((err, res) => {
                console.log(res.body);
                res.body.should.be.have.lengthOf(2)
                done();
            })
        });
    })
    describe('실패시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
})