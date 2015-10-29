$(document).ready(function() {
  if(document.getElementById("root")!=null){

    var Button = React.createClass({
      render: function() {
        return (
          <button>Go</button>
        )
      }
    });

    React.render(<Button />, document.getElementById("root"));

  }
});
