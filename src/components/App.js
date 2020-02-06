import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import QuestionShowPage from "./QuestionShowPage";
import { QuestionIndexPage } from "./QuestionIndexPage";
import { WelcomePage } from "./WelcomePage";
import { NavBar } from "./NavBar";
import { Session } from "../api/session";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  async componentDidMount() {
    // This gives us back a cookie that represents us being logged in
    // Now, when we make POST requests to the server to make a Question,
    // we will be authorized/authenticated
    // This is a Hacky method until we learn about Authentication in React
    const user = await Session.create({
      email: "js@winterfell.gov",
      password: "supersecret"
    });

    this.setState({ currentUser: user });
  }

  render() {
    return (
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <div className="ui container segment">
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/questions" component={QuestionIndexPage} />
          <Route path="/questions/:id" component={QuestionShowPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;