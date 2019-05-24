import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

class Randomat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Рандомат',
      description: 'Рандомат - это экспериментальный сервис для прошаренных пользователей.',
      url: 'http://176.112.215.37:3000'
    }
  }
  // handleClick(event){
  //    console.log(this)
  //  }
  static async getInitialProps () {
    console.log('index.js getInitialProps!')
    return {}
  }
  render () {
    return(
      <Layout title={this.state.title} description={this.state.description} url={this.state.url} >
        <div className="hero">
          <h1 className="title" style={{paddingTop: '80px'}}>Добро пожаловать!</h1>
          <h1 className="title">Вы нашли Рандомат.</h1>
          <p className="description">
            Рандомат - это экспериментальный сервис для прошаренных пользователей.
          </p>
          <div className="row">
            <Link href="/roulette">
              <a className="card">
                <h3>Рулетка &rarr;</h3>
                <p>Установи вероятность выйгрыша и выбери ячейки. Играй в хорошо знакомую рулетку, где выигрывает 1 ячейка из 100.</p>
              </a>
            </Link>
          </div>
        </div>
     </Layout>
   )
 }
}

export default Randomat
