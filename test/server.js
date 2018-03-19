const req = require('request-promise')
const assert = require('assert')
describe("server test",()=>{
  it('http',async()=>{
    await require('../server').server_ready
    assert(
      'a' === await req('http://a.lo.shynome.com')
    )
    assert(
      'b' === await req('http://b.lo.shynome.com')
    )
  })
  it('https',async()=>{
    await require('../server').server_ready
    assert(
      'a' === await req('https://a.lo.shynome.com')
    )
    assert(
      'b' === await req('https://b.lo.shynome.com')
    )
  })
  after(()=>{
    process.exit(0)
  })
})