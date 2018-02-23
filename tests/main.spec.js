let expect = require('chai').expect
let calc = require('../src/main.js')

describe('Calc', () => {
  // smoke tests
  describe('smoke tests', () => {
    
    it('should exist the calc lib', () => {
      expect(calc).to.exist
    })
    
    it('should exist the method `sum`', () => {
      expect(calc.sum).to.exist 
    })

    it('should exist the method `sub`', () => {
      expect(calc.sub).to.exist 
    })
    
    it('should exist the method `mult`', () => {
      expect(calc.mult).to.exist 
    })
    
    it('should exist the method `div`', () => {
      expect(calc.div).to.exist 
    })
  })

  describe('Sum', () => {
    it('should return 4 when `sum(2,2)`', () => {
      expect(calc.sum(2,2)).to.be.equal(4);
    })
  })
  
  describe('Sub', () => {
    it('should return 4 when `sub(6,2)`', () => {
      expect(calc.sum(2,2)).to.be.equal(4);
    })
    
    it('should return -4 when `sub(6,10)`', () => {
      expect(calc.sub(6,10)).to.be.equal(-4);
    })
  })
  
  describe('Mult', () => {
    it('should return 4 when `mult(2,2)`', () => {
      expect(calc.mult(2,2)).to.be.equal(4);
    })
  })
  
  describe('Div', () => {
    it('should return 2 when `div(4,2)`', () => {
      expect(calc.div(4,2)).to.be.equal(2);
    })
    
    it('should return `não é possível divisão por zero` when divide by 0', () => {
      expect(calc.div(4,0)).to.be.equal('não é possível divisão por zero');
    })
  })
})
