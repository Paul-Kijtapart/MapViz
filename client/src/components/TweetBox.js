import React from 'react';
import $ from 'jquery';

class TweetBox extends React.Component {
  constructor() {
    super();
    this.state = {
      tweet: 'No tweet available at the moment..',
      sentiment: 'N/A'
    };
  }

  componentDidMount() {
    setInterval(()=>{this.fetch();}, 8000)
  }

  prettify(stringIn) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;
    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = stringIn.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    replacedText = replacedText.replace(/(^|\W)(@[a-z\d][\w-]*)/ig, '$1<span class="prettyUser">$2</span>');
    return replacedText.replace(/(^|\W)(#[a-z\d][\w-]*)/ig, '$1<span class="prettyHashtag">$2</span>');
  }

  fetch() {
    $.ajax({
      url: "http://localhost:8000/polls/tweets",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({tweet: data.tweet, sentiment: data.sentiment});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err);
      }.bind(this)
    });
  }

  render() {
    const tweetRender = this.prettify(this.state.tweet);
    const sentiment = this.state.sentiment;
    return (
      <div className="sentimentInfo">
        <h3> Nearby tweets </h3>
        <p id='original' dangerouslySetInnerHTML={{__html: tweetRender}}></p>
        <div id='sentiment-summary'>Sentiment level: {sentiment}</div>
      </div>
    );
  }
};

export default TweetBox;