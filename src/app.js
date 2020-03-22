

var appRoot = document.getElementById('content');

// Page Setup

const app =  {
  title: 'Robz',
  subtitle: 'Put your life in the hands of a computer.'
};


// -------------------------------------------------------
// Components



// Layout Components

class IndecisionApp extends React.Component{

  constructor(props){
    super(props);
    this.deleteAllOptions = this.deleteAllOptions.bind(this);
    this.pickOption = this.pickOption.bind(this);
    this.toggleResultbubble = this.toggleResultbubble.bind(this);
    this.addOption = this.addOption.bind(this);
    this.errorChecker = this.errorChecker.bind(this);
    this.removeOption = this.removeOption.bind(this);

    this.state = {
      options: [],
      showBubble: false,
      pickedAnswer: '',
      hasError: false,
      currentError: ''
    };
  }

  // Delete ALl Options
  deleteAllOptions(){
    this.setState({options: []});
    this.resetError();
  }

  addOption(e){
    e.preventDefault();
    let option = e.target.elements.option.value;

    if (option){
      if(this.state.options.indexOf(option) > -1){
        this.errorChecker();
      } else {
        this.resetError();
        this.setState({
          options: this.state.options.concat(option)
        })
        e.target.elements.option.value = '';
      }
    }
  }

  pickOption(){
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    const selectedOption = this.state.options[randomNumber];

    this.toggleResultbubble();
    this.setState({pickedAnswer: selectedOption});
  }

  toggleResultbubble(){
    this.setState({showBubble: !this.state.showBubble});
  }

  errorChecker(){
    this.setState({hasError: true});
    this.setState({currentError: 'No duplicates allowed'});
  }

  resetError(){
    this.setState({hasError: false});
    this.setState({currentError: ''});
  }


  removeOption(option){
    var currentOptionsList = this.state.options;
    var indexOfOption = currentOptionsList.indexOf(option);

    if (indexOfOption !== -1) {
       currentOptionsList.splice(indexOfOption, 1);
       this.setState({options: currentOptionsList});
     }
  }

  render(){
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <Header title={app.title} subtitle={app.subtitle} />
          <main role="main" className="inner cover form-container">
            <TopPanel
              hasOptions={this.state.options.length > 0}
              deleteAllOptions={this.deleteAllOptions}
              hasError={this.state.hasError}
              currentError={this.state.currentError}
            />
            <OptionsPanel
              hasOptions={this.state.options.length > 0}
              options={this.state.options}
              removeOption={this.removeOption}
            />
            <ControlPanel
              hasOptions={this.state.options.length > 0}
              optionsList={this.state.options}
              pickOption={this.pickOption}
              toggleResultbubble={this.toggleResultbubble}
              currentBubbleState = {this.state.showBubble}
              pickedOption={this.state.pickedAnswer}
              addOption={this.addOption}
            />
          </main>
        <Footer />
      </div>
    );
  }
}



const Header = (props) => {
  return (
    <header className="masthead mb-auto text-left">
      <div className="inner">
        <h3 className="masthead-brand">{props.title}</h3>
        <nav className="nav nav-masthead">
          <h4>{props.subtitle}</h4>
        </nav>
      </div>
    </header>
  );
}



class TopPanel extends React.Component{
  render(){

    if(this.props.hasError){
      var currentErrorStatus = "helper active";
      var currentErrorMessage = this.props.currentError;
    } else {
      var currentErrorStatus = "helper";
      var currentErrorMessage = "No erros so far";
    }

    return (
      <div className="container upper">
        <div className="row">
          <div className="col-6 text-left">
            <p>Your Options</p>
          </div>
          <div className="col-6 text-right">
            <button type="submit" disabled={!this.props.hasOptions} className="btn btn-primary"  id="resetButton" onClick={this.props.deleteAllOptions}>Reset</button>
          </div>

          <div className="col-12 text-center">
            <div className={currentErrorStatus}>
              <p>{currentErrorMessage}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class OptionsPanel extends React.Component{

  constructor(props){
    super(props);
    this.isEmpty = this.props.hasOptions;
    this.state = {
      optionToRemove: ''
    };
  }

  setRemoveItem(){

  }


  render(){

    // Changes the class of the Options Container for the background Image
    if(this.props.hasOptions){
      var containerClass = "optionsContainer";
    } else {
      var containerClass = "optionsContainer empty";
    }

    return (
      <div className={containerClass}>
        <ul className="listOfOptions">
          {
              this.props.options.map((singleOption) => {
                 return <IndividualOption key={singleOption} option={singleOption} removeOption={this.props.removeOption} />;
              })
          }
        </ul>
      </div>
    );
  }
}

class IndividualOption extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      optionToSend: ''
    };
  }


  render(){
    return (
      <li key={this.props.option} className="option">{this.props.option}
        <span className="singleRemove" onClick={(e) => {
            this.props.removeOption(this.props.option);
          }}>
          x
        </span>
      </li>
    );
  }
}


class ControlPanel extends React.Component{
  render(){

    var form = (
      <div className="container">
        <form className="optionForm" onSubmit={this.props.addOption}>
          <input type="text" name="option" placeholder="New Option"/>
          <button type="submit" className="btn btn-primary" id="addButton"> <i className="fas fa-plus"></i></button>
        </form>
        <button   disabled={!this.props.hasOptions} type="submit" className="btn btn-primary robotShuffler" id="shuffleButton" onClick={this.props.pickOption}><i className="fas fa-random"></i></button>
    </div>
    );

    var bubble = (
      <div>
          <div className="resultMask"></div>
          <div className="resultBox">
            <div className="close"><button name="closeButton" onClick={this.props.toggleResultbubble}>x</button></div>
            <h3>You should propably go with:</h3>
            <p className="pickedAnswer">{this.props.pickedOption}</p>
          </div>
        </div>
    );

    if(this.props.currentBubbleState){
      return bubble;
    } else {
      return form ;
    }

  }
}



const Footer = () => {
  return (
    <footer className="mastfoot mt-auto">

      <div className="inner">
        <p><i className="fab fa-react first"></i> <i className="fas fa-plus middle"></i> <i className="fa fa-heart last"></i></p>
      </div>
    </footer>
  );
}



// -------------------------------------------------------
// JSX Renderer
const renderForm = () => {

  ReactDOM.render(<IndecisionApp/>, appRoot);

};



renderForm();
