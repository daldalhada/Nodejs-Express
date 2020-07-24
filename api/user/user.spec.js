// 테스트 코드

const request = require('supertest');
const should = require('should');
const app = require('../../index');
const { doesNotThrow } = require('should');
const models = require('../../models');

//descript이나 it 뒤에 .only를 붙이면 얘만 실행
describe('GET /users는 ', () => {
    const users = [{name: 'alice'}, {name:'bek'}, {name: 'chris'}];
    before(done => {
        models.sequelize.sync({force: true}).then(_=> done())   // 테이블 만들기
    })
    before(()=> {
        return models.User.bulkCreate(users);    // 샘플 데이터를 집어넣기 
    })
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
    describe('실패시', () => {       // db에 직접 접속하지 않기 때문에 바로 성공 
        it('limit이 숫자형이 아니면 400을 응답한다.', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    })
});


describe('GET /users/1는', () => {
    const users = [{name: 'alice'}, {name:'bek'}, {name: 'chris'}];
    before(done => {
        models.sequelize.sync({force: true}).then(_=> done())   // 테이블 만들기
    })
    before(()=> {
        return models.User.bulkCreate(users);    // 샘플 데이터를 집어넣기 
    })
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    console.log(res.body.should.have.property('id', 1).params.obj);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 404로 응답한다.', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        })
    })
});


describe('DELETE /users/1', () => {
    const users = [{name: 'alice'}, {name:'bek'}, {name: 'chris'}];
    before(done => {
        models.sequelize.sync({force: true}).then(_=> done())   // 테이블 만들기
    })
    before(()=> {
        return models.User.bulkCreate(users);    // 샘플 데이터를 집어넣기 
    })
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});


describe('POST /users', () => {     
    const users = [{name: 'alice'}, {name:'bek'}, {name: 'chris'}];
    before(done => {
        models.sequelize.sync({force: true}).then(_=> done())   // 테이블 만들기
    })
    before(()=> {
        return models.User.bulkCreate(users);    // 샘플 데이터를 집어넣기 
    })                         
    describe('성공시', () => {
        let name =  'daniel',
            body;                       
        before(done => {                            // 테스트 코드가 실행되기 전에 실행 
            request(app)
            .post('/users')
            .send({name})
            .expect(201)
            .end((err, res) => {
                body = res.body;
                done();
            });
        });      
        it('생성된 유저 객체를 반환한다.', () => {
            body.should.have.property('id')
        }); 
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name);
        })
    });
    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다', (done) => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done)
        });
    })
});


describe.only('PUT /users', () => {
    const users = [{name: 'alice'}, {name:'bek'}, {name: 'chris'}];
    before(done => {
        models.sequelize.sync({force: true}).then(_=> done())   // 테이블 만들기
    })
    before(()=> {
        return models.User.bulkCreate(users);    // 샘플 데이터를 집어넣기 
    });
           
    describe('성공시', () => {
        it('변경된 name을 응답한다', (done) => {
            const name = 'chally'
            request(app)
                .put('/users/3')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                })
        })
    });
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다.', (done) => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        })
        it('name이 없을 경우 400을 응답한다.', (done) => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done)
        })
        it('없는 유저일 경우 404를 응답한다.', (done) => {
            request(app)
                .put('/users/999')
                .send({name: 'foo'})  // 더미데이터
                .expect(404)
                .end(done);
        })
        it('이름이 중복일 경우 409를 응답한다.', (done) => {
            request(app)
                .put('/users/3')
                .send({name: 'bek'})
                .expect(409)
                .end(done);
        }) 
    })
})