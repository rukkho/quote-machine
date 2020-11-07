import React from 'react';
import './App.css';

const API =  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
class QuoteMachine  extends React.Component {
  constructor(props){
    super(props);
    this.state={
      quotes: [
        {
          "quote":"Life isn’t about getting and having, it’s about giving and being.","author":"Kevin Kruse"
        }
      ],
      index: 0
    }
    // this.getRandomIndex = this.getRandomIndex.bind(this);
  }
  componentDidMount(){
    fetch(API)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      this.setState({
        quotes: res.quotes
      },this.getRandomIndex);
    })
  }
  getRandomIndex =()=>{
    const {quotes} = this.state;
    if(quotes.length>0){
      const index = Math.floor(Math.random()* quotes.length)
      this.setState({
        index
      }) 
    }
   
  }
  render(){
    const {quotes, index} = this.state;
    const quote = quotes[index]
    console.log(quotes)
    console.log(index);
    const tweetUrl ='https://twitter.com/intent/tweet?text= ${quote.quote} -${quote.author}';
    return (
      <div className="wrapper App d-flex align-items-center justify-content-center" id= "quote-box">
        <div className= "col-6 box p-5 rounded" >
           {
              quote && (
              <div className="mb-3">
                <p id="text">{quote.quote}</p>
                <cite className= "d-block text-right" id= "author"> - {quote.author}</cite>
              </div>
              )            }
          <div className= "d-flex justify-content-between">
           
            <a target="_blank" id="tweet-quote" href={tweetUrl} className="btn btn-primary"><i className="fa fa-twitter"></i>Tweet</a>
            <button  className="btn btn-primary" onClick={this.getRandomIndex} id="new-quote">New Quote</button>
          </div>
        </div>

      </div>
    );
  }
  
}

export default QuoteMachine ;
