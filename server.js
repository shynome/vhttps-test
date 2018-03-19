const vhttps = require('vhttps')
const vhost = require('vhost')
const fs = require('fs')
const server = vhttps.init()
const app = require('express')()

app.use(
  vhost('a.lo.shynome.com',(req,res)=>res.end('a')),
)
app.use(
  vhost('b.lo.shynome.com',(req,res)=>res.end('b')),
)

exports.server_ready = Promise.all([
  new Promise((rl,rj)=>{
    app.once('error',rj).listen(80,rl)
  }),
  new Promise((rl,rj)=>{
    vhttps.createServer({},[
      {
        hostname: 'a.lo.shynome.com',
        cert: fs.readFileSync('./ssl/a.lo/1_a.lo.shynome.com_bundle.crt'),
        key: fs.readFileSync('./ssl/a.lo/2_a.lo.shynome.com.key'),
      },
      {
        hostname: 'b.lo.shynome.com',
        cert: fs.readFileSync('./ssl/b.lo/1_b.lo.shynome.com_bundle.crt'),
        key: fs.readFileSync('./ssl/b.lo/2_b.lo.shynome.com.key'),
      },
    ],app)
    .once('error',rj).listen(443,rl)
  })
])