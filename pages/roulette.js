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

const fieldSpanRed = {
  border: '1px solid #0d0d0d',
  boxSizing: 'content-box',
  lineHeight: '45px',
  listStyleType: 'none',
  display: 'block',
  width: '45px',
  margin: '1px',
  background: 'red'
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
    super(props);

    this.state = {
      chance: 10,
      title: 'Рандомат: Рулетка',
      description: 'Установи вероятность выйгрыша и выбери ячейки. Играй в хорошо знакомую рулетку, где выигрывает 1 ячейка из 100.',
      url: 'http://176.112.215.37:3000',
      counter: this.props.counter || 0,
      hash: this.props.hash || '',
      marked: this.props.marked || [],
      matrix: this.props.matrix || [],
      result: this.props.result || undefined,
      winning: this.props.winning || undefined
    }
  }
  async handleClickInit(event){
    const res = await fetch(`${this.state.url}/r/new`)
    const data = await res.json()
    this.setState({
      counter: data.counter,
      hash: data.hash,
      marked: [],
      winning: undefined,
      result: undefined
    })
  }
  async handleClickStart(event){
    const res = await fetch(`${this.state.url}/r/check/${this.state.counter}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ marked: this.state.marked, hash: this.state.hash, counter: this.state.counter})
    })
    const data = await res.json()
    this.setState({
      winning: data.winning,
      result: data.result
    })
    if(data.result) {
      alert('Вы выйграли!')
    } else {
      alert('Вы проиграли!')
    }
  }
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
  static async getInitialProps () {
    const matrix = await emptyMatrix([], 1)
    return ({ matrix: matrix })
  }
  render () {
    return(
      <Layout title={this.state.title} description={this.state.description} url={this.state.url}>
        <div className="hero">
          <h1 className="title" style={{paddingTop: '0px', fontSize: '24px'}}>Рулетка</h1>
          <p className="description">
             Играй в хорошо знакомую рулетку, где выигрывает 1 ячейка из 100.
          </p>
          <div className="row-roulette-params">
            <div className="roulette-params" style={{width: '100%', paddingBottom: '24px'}}>
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
            <div className="roulette-params"  style={{marginRight: '5px', width: '50%'}}>
              <h3>Осталось ячеек: {this.state.chance - this.state.marked.length}</h3>
            </div>
            <div className="roulette-params" style={{marginLeft: '5px', width: '50%'}}>
              <h3>Номер рулетки: {this.state.counter}</h3>
            </div>
          </div>
          <div className="row-roulette-params">
            <button className="roulette-click" style={{marginRight: '10px',width: '20%'}} type="button" onClick={(e) => {e.preventDefault(); this.handleClickInit(e)}}>
              Сделать ставку
            </button>
            <div className="roulette-params" style={{width: '60%'}}>
              <h3>Хэш рулетки: {this.state.hash}</h3>
            </div>
            <button className="roulette-click" style={{marginLeft: '10px',width: '20%'}} type="button" onClick={(e) => {e.preventDefault(); this.handleClickStart(e)}}>
              Начать игру
            </button>
          </div>
          <div className="row-roulette-params">
            <div id="fields-form" style={fieldForm}>
              {this.state.matrix.map( items => (
                <div key={`row-${items[9]/10}`} style={fieldLine}>
                  {items.map( item => (
                    <div key={`div-field-${item}`} onClick={(e) => {e.preventDefault(); this.fieldClick(e)}} >
                      <label style={fieldLabel}>
                        <span id={`field-${item}`} className={this.state.marked.indexOf(1 * item) === -1 ? 'unmarked' : 'marked'} style={this.state.winning === 1 * item ? fieldSpanRed : fieldSpan}>{item}</span>
                        <input name={`fields[${item}]`} value={item} style={fieldInput} type="checkbox" />
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(Roulette)
