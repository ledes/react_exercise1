// Exercise 1

var Button = React.createClass({
  localHandleClick: function() {
    this.props.localHandleClick(this.props.increment);
  },
  render: function() {
    return (
      <button onClick={this.localHandleClick}>+{this.props.increment}</button>
    )
  }
});

var Result = React.createClass({
  render: function(){
    return(
      <div>{this.props.localCounter}</div>
    )
  }
})

var Main1 = React.createClass({
  getInitialState: function() {
    return {counter: 0};
  },
  handleClick: function(increment) {
    this.setState({ counter: this.state.counter+increment });
  },
  render: function(){
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1}/>
        <Button localHandleClick={this.handleClick} increment={5}/>
        <Button localHandleClick={this.handleClick} increment={10}/>
        <Button localHandleClick={this.handleClick} increment={20}/>
        <Result localCounter={this.state.counter}/>
      </div>
    )
  }
})

React.render(<Main1 />, document.getElementById("exercise1"));

// Exercise 2

var Card = React.createClass({
  getInitialState: function(){
    return{};
  },
  componentDidMount: function(){
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      component.setState(data);
    });
  },
  render: function(){
    return (
      <div>
        <img src={this.state.avatar_url} width="100" />
        <h3>{this.state.name}</h3>
        <hr/>
      </div>
    );
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="github login" ref="login"/>
        <button>Add</button>
      </form>
    );
  }
});

var Main2 = React.createClass({
  getInitialState: function(){
    return{logins: []};
  },
  addCard: function(loginToAdd){
    this.setState({logins: this.state.logins.concat(loginToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login){
      return (<Card login={login} />);
    });
    return(
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>
    )
  }
});

React.render(<Main2 />, document.getElementById("exercise2"));
