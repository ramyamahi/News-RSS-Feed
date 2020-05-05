import React from "react";

let Parser = require("rss-parser");
let parser = new Parser({
  customFields: {
    feed: ["otherTitle", "extendedDescription"],
    item: ["image", "description"]
  }
});

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedList: []
    };
  }

  async componentWillMount() {
    this.fetchFeed();
  }

  async fetchFeed() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let feed = await parser.parseURL(
      CORS_PROXY +
        "https://www.kannadaprabha.com/%E0%B2%B0%E0%B2%BE%E0%B2%9C%E0%B3%8D%E0%B2%AF/rssfeed/?id=7&getXmlFeed=true",
      this.item
    );
    this.setState({ feedList: feed.items });
  }

  render() {
    return (
      <div>
        <h2>Breaking News</h2>
        <br />
        {this.state.feedList.map(feed => {
          return (
            <React.Fragment>
              <h4>{feed.title}</h4>
              <a href={feed.link}>
                <img src={feed.image} alt="Feed image" />
              </a>
              <div>{feed.description}</div>
              <br />
              <br />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default NewsFeed;
