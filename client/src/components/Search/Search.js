import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import SearchResultsContainer from "../SearchResultsContainer/SearchResultsContainer";
import Card from "../Card/Card";
import axios from "axios";

class Search extends Component {
  state = {
    search: "",
    users: [],
    results: []
  };

  componentDidMount() {
    axios.get("api/profile/all").then(res => {
      let users = [];
      res.data.map(item => {
        users.push(item);
      });
      this.setState({
        users
      });
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    let { users, search, results } = this.state;
    let matches = [];
    e.preventDefault();

    users.map((user, i) => {
      if (user.status.toLowerCase() == search.toLowerCase()) {
        matches.push(user);
      }
    });

    this.setState({
      results: matches
    });
  };

  render() {
    return (
      <div>
        <TextFieldGroup
          placeholder="Search for instrument(s)"
          name="search"
          value={this.state.search}
          onChange={this.onChange}
          info="instructions"
        />
        <button onClick={this.onClick}>Search</button>
        <SearchResultsContainer>
          {this.state.results.map((result, i) => {
            return (
              <Card
                key={i}
                name={result.user.name}
                instrument={result.status}
              />
            );
          })}
        </SearchResultsContainer>
      </div>
    );
  }
}

export default Search;

{
  /* <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
  </div>
</div> */
}
