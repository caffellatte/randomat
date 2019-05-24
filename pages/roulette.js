import React from 'react'
import InputRange from 'react-input-range'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Router, { withRouter } from 'next/router'

const fieldForm = {
  border: '1px solid #0d0d0d',
  listStyle: 'none',
  display: 'inline-flex',
  flexDirection: 'column',
  textAlign: 'center',
  backgroundColor: '#ffffff',
  boxSizing: 'content-box'
}

const fieldLine = {
  clear: 'both',
  listStyle: 'none',
  boxSizing: 'content-box',
  color: 'rgb(46, 47, 48)',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: '300',
  lineHeight: '20px',
  listStyleImage: 'none',
  listStylePosition: 'outside',
  listStyleType: 'none'
}

const fieldSpan = {
  border: '1px solid #0d0d0d',
  boxSizing: 'content-box',
  lineHeight: '45px',
  listStyleType: 'none',
  display: 'block',
  width: '45px',
  margin: '1px'
}

const fieldLabel = {
  cursor: 'pointer',
  textAlign: 'center',
  display: 'block',
}

const fieldInput = {
  display: 'none'
}

const emptyMatrix = (m, k) => {
  for(var i=0; i<10; i++) {
    m[i] = [];
    for(var j=0; j<10; j++) {
        m[i][j] = k++;
    }
  }
  return m
}

class Roulette extends React.Component {
  constructor(props) {
    console.log('hi constructor!')
    super(props);

    console.log(this.props)
    this.state = {
      chance: 10,
      title: 'Рандомат: Рулетка',
      description: 'Установи вероятность выйгрыша и выбери ячейки. Играй в хорошо знакомую рулетку, где выигрывает 1 ячейка из 100.',
      url: 'http://176.112.215.37:3000',
      counter: this.props.counter,
      hash: this.props.hash,
      marked: [],
      matrix: this.props.matrix,
      result: undefined,
      winning: undefined
    }
  }
  async handleClick(event){
    const res = await fetch(`http://176.112.215.37:3000/r/check/${this.state.counter}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ marked: this.state.marked, hash:  this.state.hash})
    })
    const data = await res.json()
    const {winning, result} = data
    this.setState({
      winning: winning,
      result: result
    })
    Router.push({
      pathname: '/roulette-results',
      // query: query
    })
    // console.log(data)
  }
  // componentDidUpdate(prevProps) {
  //   const { pathname, query } = this.props.router
  //   console.log('pathname: ', pathname)
  //   console.log('query: ', query)
  //   // verify props have changed to avoid an infinite loop
  //   if (query.id !== prevProps.router.query.id) {
  //     // fetch data based on the new query
  //   }
  // }
  fieldClick(event){
    let fieldNumber = 1 * event.currentTarget.children[0].innerText
    let indexOfItem = this.state.marked.indexOf(fieldNumber)
    let field = event.currentTarget.children[0].children[0]
    console.log('fieldNumber:', fieldNumber, 'indexOfItem: ', indexOfItem)
    console.log('this.state.chance - this.state.marked.length =', this.state.chance - this.state.marked.length)
    if (indexOfItem === -1 && this.state.chance - this.state.marked.length > 0){
      this.setState({
        marked: this.state.marked.concat(fieldNumber)
      })
    }
    if(indexOfItem > -1) {
      this.setState({
        marked: this.state.marked.slice(0, indexOfItem).concat(this.state.marked.slice(indexOfItem + 1, this.state.marked.length))
      })
    }
  }
  static async getInitialProps ({ query }) {
    console.log('getInitialProps: ', query)
    const res = await fetch(`http://176.112.215.37:3000/r/new`)
    const data = await res.json()
    const matrix = await emptyMatrix([], 1)
    return ({
      counter: data.counter,
      hash: data.hash,
      matrix: matrix
    })
  }
  render () {
    return(
      <Layout title={this.state.title} description={this.state.description} url={this.state.url}>
        <div className="hero">
          <h1 className="title" style={{paddingTop: '80px'}}>Поздравляем Вас!</h1>
          <h1 className="title">Вы нашли Рулетку.</h1>
          <p className="description">
             Играй в хорошо знакомую рулетку, где выигрывает 1 ячейка из 100.
          </p>
          <div className="row-roulette-params">
            <div className="roulette-params">
              <h3>Вероятность выйгрыша: {this.state.chance}%</h3>
              <p>Установи вероятность выйгрыша</p>
              <div className="input-range">
                <form className="input-range-form">
                  <InputRange
                    maxValue={100}
                    minValue={0}
                    value={this.state.chance}
                    onChange={chance => this.setState({ chance })}
                    onChangeStart={chance => console.log('onChangeStart with value =', chance)}
                    onChangeComplete={chance => console.log(chance)} />
                  </form>
                </div>
            </div>
          </div>
          <div className="row-roulette-params">
            <div className="roulette-params">
              <h3>Осталось ячеек: {this.state.chance - this.state.marked.length}</h3>
            </div>
          </div>
          <div className="row-roulette-params">
            <div className="roulette-params">
              <h3>Номер рулетки: {this.state.counter}</h3>
            </div>
          </div>
          <div className="row-roulette-params">
            <div className="roulette-params">
              <h3>Хэш рулетки: {this.state.hash}</h3>
            </div>
          </div>
          <div className="row-roulette-params">
            <div id="fields-form" style={fieldForm}>
              {this.state.matrix.map( items => (
                <div key={`row-${items[9]/10}`} style={fieldLine}>
                  {items.map( item => (
                    <div key={`div-field-${item}`} onClick={(e) => {e.preventDefault(); this.fieldClick(e)}} >
                      <label style={fieldLabel}>
                        <span id={`field-${item}`} className={this.state.marked.indexOf(1 * item) === -1 ? 'unmarked' : 'marked'} style={fieldSpan}>{item}</span>
                        <input id={`field-${item}`} name={`fields[${item}]`} value={item} style={fieldInput} type="checkbox" />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="row-roulette-params">
            <button className="roulette-click" type="button" onClick={(e) => {e.preventDefault(); this.handleClick(e)}}>
              Играть
            </button>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(Roulette)
