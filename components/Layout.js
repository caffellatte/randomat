import Header from './Header'
import Navigation from './Navigation'

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title,
      description: this.props.description,
      url: this.props.url
    }
  }

  render () {
    return(
      <div>
        <Header title={this.state.title} description={this.state.description} url={this.state.url} />
        <Navigation />
        {this.props.children}
        <style jsx global>{`
         .hero {
           width: 100%;
           color: #333;
         }
         .title {
           margin: 0;
           width: 100%;
           line-height: 1.15;
           font-size: 48px;
         }
         .title,
         .description {
           text-align: center;
         }
         .row {
           max-width: 880px;
           margin: 80px auto 40px;
           display: flex;
           flex-direction: row;
           justify-content: space-around;
         }
         .row-roulette-params {
           max-width: 880px;
           margin: 10px auto 10px;
           display: flex;
           flex-direction: row;
           justify-content: space-around;
         }
         .card {
           padding: 18px 18px 24px;
           width: 220px;
           text-align: left;
           text-decoration: none;
           color: #434343;
           border: 1px solid #9b9b9b;
         }
         .card:hover {
           border-color: #067df7;
         }
         .card h3 {
           margin: 0;
           color: #067df7;
           font-size: 14px;
         }
         .card p {
           margin: 0;
           padding: 12px 0 0;
           font-size: 13px;
           color: #333;
         }
         .roulette-params {
           padding: 3px 3px 4px;
           width: 520px;
           text-align: center;
           text-decoration: none;
           color: #434343;
           border: 1px solid #9b9b9b;
         }
         .roulette-click {
           padding: 18px 18px 18px;
           width: 220px;
           text-align: center;
           text-decoration: none;
           color: #434343;
           border: 1px solid #9b9b9b;
           font-size: 18px;
         }
         .roulette-click:hover {
           border-color: #067df7;
           background: #ccc;
           color: #067df7;
         }
         .marked {
           background-color: #000000;
           color: #ffffff;
           font-weight: bold;
         }
         .unmarked {
           background-color: #ffffff;
           color: #000000;
           font-weight: bold;
         }
         .input-range__slider {
           appearance: none;
           background: #3f51b5;
           border: 1px solid #3f51b5;
           border-radius: 100%;
           cursor: pointer;
           display: block;
           height: 1rem;
           margin-left: -0.5rem;
           margin-top: -0.65rem;
           outline: none;
           position: absolute;
           top: 50%;
           transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
           width: 1rem; }
           .input-range__slider:active {
             transform: scale(1.3); }
           .input-range__slider:focus {
             box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.2); }
           .input-range--disabled .input-range__slider {
             background: #cccccc;
             border: 1px solid #cccccc;
             box-shadow: none;
             transform: none; }
         .input-range__slider-container {
           transition: left 0.3s ease-out; }
         .input-range__label {
           color: #aaaaaa;
           font-family: "Helvetica Neue", san-serif;
           font-size: 0.8rem;
           transform: translateZ(0);
           white-space: nowrap; }
         .input-range__label--min,
         .input-range__label--max {
           bottom: -1.4rem;
           position: absolute; }
         .input-range__label--min {
           left: 0; }
         .input-range__label--max {
           right: 0; }
         .input-range__label--value {
           position: absolute;
           top: -1.8rem; }
         .input-range__label-container {
           left: -50%;
           position: relative; }
           .input-range__label--max .input-range__label-container {
             left: 50%; }
         .input-range__track {
           background: #eeeeee;
           border-radius: 0.3rem;
           cursor: pointer;
           display: block;
           height: 0.3rem;
           position: relative;
           transition: left 0.3s ease-out, width 0.3s ease-out; }
           .input-range--disabled .input-range__track {
             background: #eeeeee; }
         .input-range__track--background {
           left: 0;
           margin-top: -0.15rem;
           position: absolute;
           right: 0;
           top: 50%; }
         .input-range__track--active {
           background: #3f51b5; }
         .input-range {
           height: 1rem;
           position: relative;
           width: 100%; }
       `}</style>
      </div>
    )
  }
}

export default Layout
