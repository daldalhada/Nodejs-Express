// spec.js는 보통 테스트 코드라고 보면 됨 
// assert는 유닛 테스트를 위해서 Node.js에서 사용할 수 있는 테스트 모듈이다. 
// 유닛 테스트는 특정 모듈이 예상한 대로 돌아가는지 검증하는 것이 목표 

const utils = require('./utils');
const assert = require('assert');
const should = require('should');



// 테스트 환경
describe('utils.js모듈의 capitaliza() 함수는', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.cap('hello');
        // assert.equal(result, 'Hello');
        result.should.be.equal('Hello');
    })
})