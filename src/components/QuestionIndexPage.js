import React, { Component } from "react";

import NewQuestionForm from "./NewQuestionForm";
import data from "../questionData";

export class QuestionIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // This copies the questions array into
      // a new array that is stored in the state
      // of this component, as the state's questions field
      // questions: data.map(question => question)
      questions: [...data]
    };

    // this.createQuestion = this.createQuestion.bind(this);
  }

  deleteQuestion(id) {
    // To update state ALWAYS use 'setState(...)' method

    // You can use setState by passing an object to its first argument.
    // Whe the time comes, the object will be merged with the current state

    // This will change whatever properties are within the current state
    // this.setState({
    //   questions: this.state.questions.filter(q => q.id !== id)
    // });

    // You can also use setState by giving a callback as a first argument
    // that receives the current state an dprops as arguments.
    // It must return an object that will be merge with the state
    this.setState((state, props) => {
      return {
        questions: state.questions.filter(q => q.id !== id)
      };
    });
  }

  createQuestion = params => {
    // update the list of questions within our state
    // by adding a new question to that list
    this.setState(state => {
      return {
        questions: [
          {
            ...params,
            id: Math.max(...state.questions.map(q => q.id)) + 1
          },
          ...state.questions
        ]
      };
    });
  };

  render() {
    return (
      <main>
        <NewQuestionForm onCreateQuestion={this.createQuestion} />
        <h2>Questions</h2>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0
          }}
        >
          {this.state.questions.map(question => (
            <li key={question.id} style={{ padding: "0.2em" }}>
              <a href="">{question.title}</a>
              <button onClick={() => this.deleteQuestion(question.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}