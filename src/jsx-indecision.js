

var appRoot = document.getElementById('content');

// Classes

class Tagline {
  constructor(message = "Turning Coffee into Code", emoji = "☕"){ // This is the default value of "message"
    this.message = message;
    this.emoji = emoji;
  }
  getTagline(){
    // ES5
    // return this.message + " 🤖";
    // ES6
    return `${this.message} ${this.emoji}`;
  }
}

class TaglineWithTech extends Tagline {
  constructor(message, emoji, technologie){
    super(message);
    this.emoji = emoji;
    this.technologie = technologie;
  }
  getTagline(){
    let tagline = super.getTagline();
    return `${tagline} - built with ${this.technologie}`;
  }
}

const currentTagline = new Tagline();

const currentTaglineExtra = new TaglineWithTech("Put your life in the hands of a computer", "🤖", "React");

console.log(currentTagline.getTagline());
console.log(currentTaglineExtra.getTagline());

const app =  {
  title: 'Robz',
  subtitle: 'Put your life in the hands of a computer.',
  options: []
};


let addOption = (e) => {
  e.preventDefault();

  let option = e.target.elements.option.value;

  console.log(option);

  if (option){
    app.options.push(option);
    e.target.elements.option.value = '';
    renderForm();
  }
};

let resetOptions = (e) => {
  app.options = [];
  renderForm();
};


let shuffleOptions = (e) => {
  const randomNumber = Math.floor(Math.random() * app.options.length);
  const selectedOption = app.options[randomNumber];
  visibility = true;

  var finalMessageBubble = (
    <div>
      <div className="resultMask"></div>
      <div className="resultBox">
        <div className="close"><button name="closeButton" onClick={resetOptions}>x</button></div>
        <h3>You should propably go with:</h3>
        <p>{selectedOption}</p>
      </div>
    </div>
  );

  renderForm();
};


const renderForm = () => {


  if(app.options.length == 0){
    var containerClass = "optionsContainer empty";

  } else {
    var containerClass = "optionsContainer";
  }



  var message = (


    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="masthead mb-auto text-left">
        <div className="inner">
          <h3 className="masthead-brand">{app.title}</h3>
          <nav className="nav nav-masthead">
            <h4>{app.subtitle}</h4>
          </nav>
        </div>
      </header>
      <main role="main" className="inner cover form-container">

        <div className="container upper">
          <div className="row">
            <div className="col-6 text-left">
              <p>Your Options</p>
            </div>
            <div className="col-6 text-right">
              <button type="submit" disabled={app.options.length == 0} className="btn btn-primary"  id="resetButton" onClick={resetOptions} >Reset</button>
            </div>
          </div>
        </div>

        <div className={containerClass}>
          <ul className="listOfOptions">
            {
                app.options.map((singleOption) => {
                   return <li key={singleOption} className="option">{singleOption}</li>;
                })
            }
          </ul>
        </div>

        <div className="container">
          <form className="optionForm" onSubmit={addOption}>
            <input type="text" name="option" placeholder="New Option"/>
            <button type="submit" className="btn btn-primary" id="addButton" > <i className="fas fa-plus"></i> </button>
          </form>
          <button disabled={app.options.length == 0} type="submit" className="btn btn-primary robotShuffler" id="shuffleButton" onClick={shuffleOptions} ><i className="fas fa-random"></i></button>
        </div>




      </main>
      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p><i className="fab fa-react first"></i> <i className="fas fa-plus middle"></i> <i className="fa fa-heart last"></i></p>
        </div>
      </footer>
    </div>
  );

  ReactDOM.render(message, appRoot);
};

renderForm();
