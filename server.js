const express = require('express')
const next = require('next')
const levelup = require('levelup')
const leveldown = require('leveldown')
const encode = require('encoding-down')
const hash = require('hash.js')
const { Random, MersenneTwister19937 } = require("random-js")
const random = new Random(MersenneTwister19937.autoSeed())
const db = levelup(encode(leveldown('./db'), { valueEncoding: 'json' }))

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app
  .prepare()
  .then(() => {
    const server = express()

  server.use(express.json())

    // server.get('/p/:id', (req, res) => {
    //   const actualPage = '/post'
    //   const queryParams = { id: req.params.id }
    //   app.render(req, res, actualPage, queryParams)
    // })

    server.post('/r/check/:counter', (req, res) => {
      const { counter } = req.params
      const { marked, hash} = req.body
      db.get(counter, (err, data) => {
        if (err) {
          console.log('Ooops!', err)
          res.end(JSON.stringify({ error: err }))
          return
        }
        data.checked = true
        data.marked = marked
        if (data.winning in marked) {
          data.result = true
        } else {
          data.result = false
        }
        db.put(counter, data, (err) => {
          if (err) {
            console.log('Ooops!', err)
            res.end(JSON.stringify({ error: err }))
            return
          }
          res.end(JSON.stringify({response: data}))
          const actualPage = '/roulette-results'
          const queryParams = {
            winning: data.winning,
            result: data.result,
            checked: data.checked,
            marked: marked,
            hash: hash,
            counter: counter
          }
          // console.log(queryParams)
          return app.render(req, res, actualPage, queryParams)
        })
      })
    })

    server.get('/r/new', (req, res) => {
      db.get('counter', (err, counter) => {
        if (err) {
          console.log('Ooops!', err)
          res.end(JSON.stringify({ error: err }))
          return
        }
        counter += 1
        const winning = random.integer(1, 100)
        const winningHash = hash.ripemd160().update(winning.toString() + counter.toString()).digest('hex')
        db.put('counter', counter, (err) => {
          if (err) {
            console.log('Ooops!', err)
            res.end(JSON.stringify({ error: err }))
            return
          }
          db.put(counter, {
            counter: counter,
            winning: winning,
            hash: winningHash,
            checked: false
          }, (err) => {
            if (err) {
              console.log('Ooops!', err)
              res.end(JSON.stringify({ error: err }))
              return
            }
            db.get(counter, (err, data) => {
              if (err) {
                console.log('Ooops!', err)
                res.end(JSON.stringify({ error: err }))
                return
              }
              // console.log(data)
              res.end(JSON.stringify({
                counter: data.counter,
                hash: data.hash
              }))
            })
          })
        })
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
