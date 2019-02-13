import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import ssss from './search.png'
const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      cardQuery: null,
      cardShow: [],
      cardSelect: null,
      namePokamon: ''
    }

    this.handelClick = this.handelClick.bind(this)
    this.getCard = this.getCard.bind(this)
    this.getCardByName = this.getCardByName.bind(this)
    this.updateInputPokemon = this.updateInputPokemon.bind(this)

  }

  handelClick() {
    this.setState({
      open: !this.state.open
    })
    this.getCard()
  }

  updateInputPokemon(evt) {
    this.setState({
      namePokamon: evt.target.value
    });
    this.getCardByName()
  }

  getCard() {
    axios.get(`http://localhost:3030/api/cards`)
      .then(res => {
        this.setState({
          cardQuery: res.data.cards
        });
        console.log(res.data.cards)
      }).catch(error => {

      })
  }

  getCardByName() {
    axios.get(`http://localhost:3030/api/cards?limit=30&name=` + this.state.namePokamon)
      .then(res => {
        this.setState({
          cardQuery: res.data.cards
        });
        console.log(res.data.cards)
      }).catch(error => {

      })
  }

  render() {
    return (
      <div className="App">
        <center>
          <h1>My Pokedex</h1>
          <div className="barAddDex" >
            <a className="addDex" onClick={this.handelClick}>
              +
            </a>
          </div>
        </center>
        {this.state.open
          ?
          <div className="cardShadow">
            <center>
              <div className="card">
                <input className="inputFind" placeholder="Find pokemon" value={this.state.namePokamon} onChange={this.updateInputPokemon}>
                </input>
                <div className="divCard">
                  {this.state.cardQuery != null
                    ? this.state.cardQuery.map(function (cardQuery, index) {
                      return <div className="cardPokemon">
                        <img src={cardQuery.imageUrl} className="imageCard"></img>
                        <label className="labelDetailCard"><h2>{cardQuery.name}</h2></label>
                        <label className="labelDetailCard"><h3>HP</h3>
                          <div className="barHp barStatus">
                            <div className="barTrueStatus">
                            </div>
                          </div>
                        </label>
                        <label className="labelDetailCard"><h3>STR</h3>
                          <div className="barStr barStatus">
                            <div className="barTrueStatus">
                            </div>
                          </div>
                        </label>
                        <label className="labelDetailCard"><h3>WERK</h3>
                          <div className="barStatus">
                            <div className="barTrueStatus">
                            </div>
                          </div>
                        </label>
                      </div>
                    })
                    : ''
                  }
                </div>

              </div>
            </center>
          </div>
          : ''
        }


      </div>
    )
  }
}

export default App
