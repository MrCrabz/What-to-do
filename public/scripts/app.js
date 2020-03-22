'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appRoot = document.getElementById('content');

// Page Setup

var app = {
  title: 'Robz',
  subtitle: 'Put your life in the hands of a computer.'
};

// -------------------------------------------------------
// Components


// Layout Components

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.deleteAllOptions = _this.deleteAllOptions.bind(_this);
    _this.pickOption = _this.pickOption.bind(_this);
    _this.toggleResultbubble = _this.toggleResultbubble.bind(_this);
    _this.addOption = _this.addOption.bind(_this);
    _this.errorChecker = _this.errorChecker.bind(_this);
    _this.removeOption = _this.removeOption.bind(_this);

    _this.state = {
      options: [],
      showBubble: false,
      pickedAnswer: '',
      hasError: false,
      currentError: ''
    };
    return _this;
  }

  // componentDidMount(){
  //
  //   try{
  //     const json = localStorage.getItem('options');
  //     const options = JSON.parse(json);
  //
  //     this.setState({options: options});
  //   } catch (e){
  //
  //   }
  //
  // }

  _createClass(IndecisionApp, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }

    // Delete ALl Options

  }, {
    key: 'deleteAllOptions',
    value: function deleteAllOptions() {
      this.setState({ options: [] });
      this.resetError();
    }
  }, {
    key: 'addOption',
    value: function addOption(e) {
      e.preventDefault();
      var option = e.target.elements.option.value;

      if (option) {
        if (this.state.options.indexOf(option) > -1) {
          this.errorChecker();
        } else {
          this.resetError();
          this.setState({
            options: this.state.options.concat(option)
          });
          e.target.elements.option.value = '';
        }
      }
    }
  }, {
    key: 'pickOption',
    value: function pickOption() {
      var randomNumber = Math.floor(Math.random() * this.state.options.length);
      var selectedOption = this.state.options[randomNumber];

      this.toggleResultbubble();
      this.setState({ pickedAnswer: selectedOption });
    }
  }, {
    key: 'toggleResultbubble',
    value: function toggleResultbubble() {
      this.setState({ showBubble: !this.state.showBubble });
    }
  }, {
    key: 'errorChecker',
    value: function errorChecker() {
      this.setState({ hasError: true });
      this.setState({ currentError: 'No duplicates allowed' });
    }
  }, {
    key: 'resetError',
    value: function resetError() {
      this.setState({ hasError: false });
      this.setState({ currentError: '' });
    }
  }, {
    key: 'removeOption',
    value: function removeOption(option) {
      var currentOptionsList = this.state.options;
      var indexOfOption = currentOptionsList.indexOf(option);

      if (indexOfOption !== -1) {
        currentOptionsList.splice(indexOfOption, 1);
        this.setState({ options: currentOptionsList });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      var isThereOptions = false;

      if (this.state.options.length > 0) {
        isThereOptions = true;
      }

      return React.createElement(
        'div',
        { className: 'cover-container d-flex w-100 h-100 p-3 mx-auto flex-column padding-zero' },
        React.createElement(Header, { title: app.title, subtitle: app.subtitle }),
        React.createElement(
          'main',
          { role: 'main', className: 'inner cover form-container' },
          React.createElement(TopPanel, {
            hasOptions: isThereOptions,
            deleteAllOptions: this.deleteAllOptions,
            hasError: this.state.hasError,
            currentError: this.state.currentError
          }),
          React.createElement(OptionsPanel, {
            hasOptions: isThereOptions,
            options: this.state.options,
            removeOption: this.removeOption
          }),
          React.createElement(ControlPanel, {
            hasOptions: isThereOptions,
            optionsList: this.state.options,
            pickOption: this.pickOption,
            toggleResultbubble: this.toggleResultbubble,
            currentBubbleState: this.state.showBubble,
            pickedOption: this.state.pickedAnswer,
            addOption: this.addOption
          })
        ),
        React.createElement(Footer, null)
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    'header',
    { className: 'masthead mb-auto text-left' },
    React.createElement(
      'div',
      { className: 'inner' },
      React.createElement(
        'h3',
        { className: 'masthead-brand' },
        props.title
      ),
      React.createElement(
        'nav',
        { className: 'nav nav-masthead' },
        React.createElement(
          'h4',
          null,
          props.subtitle
        )
      )
    )
  );
};

var TopPanel = function (_React$Component2) {
  _inherits(TopPanel, _React$Component2);

  function TopPanel() {
    _classCallCheck(this, TopPanel);

    return _possibleConstructorReturn(this, (TopPanel.__proto__ || Object.getPrototypeOf(TopPanel)).apply(this, arguments));
  }

  _createClass(TopPanel, [{
    key: 'render',
    value: function render() {

      if (this.props.hasError) {
        var currentErrorStatus = "helper active";
        var currentErrorMessage = this.props.currentError;
      } else {
        var currentErrorStatus = "helper";
        var currentErrorMessage = "No erros so far";
      }

      return React.createElement(
        'div',
        { className: 'container upper padding-zero' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col-6 text-left' },
            React.createElement(
              'p',
              null,
              'Your Options'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-6 text-right' },
            React.createElement(
              'button',
              { type: 'submit', disabled: !this.props.hasOptions, className: 'btn btn-primary', id: 'resetButton', onClick: this.props.deleteAllOptions },
              'Reset'
            )
          ),
          React.createElement(
            'div',
            { className: 'col-12 text-center' },
            React.createElement(
              'div',
              { className: currentErrorStatus },
              React.createElement(
                'p',
                null,
                currentErrorMessage
              )
            )
          )
        )
      );
    }
  }]);

  return TopPanel;
}(React.Component);

var OptionsPanel = function (_React$Component3) {
  _inherits(OptionsPanel, _React$Component3);

  function OptionsPanel(props) {
    _classCallCheck(this, OptionsPanel);

    var _this3 = _possibleConstructorReturn(this, (OptionsPanel.__proto__ || Object.getPrototypeOf(OptionsPanel)).call(this, props));

    _this3.isEmpty = _this3.props.hasOptions;
    _this3.state = {
      optionToRemove: ''
    };
    return _this3;
  }

  _createClass(OptionsPanel, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      // Changes the class of the Options Container for the background Image
      if (this.props.hasOptions) {
        var containerClass = "optionsContainer";
      } else {
        var containerClass = "optionsContainer empty";
      }

      return React.createElement(
        'div',
        { className: containerClass },
        React.createElement(
          'ul',
          { className: 'listOfOptions' },
          this.props.options.map(function (singleOption) {
            return React.createElement(IndividualOption, { key: singleOption, option: singleOption, removeOption: _this4.props.removeOption });
          })
        )
      );
    }
  }]);

  return OptionsPanel;
}(React.Component);

var IndividualOption = function (_React$Component4) {
  _inherits(IndividualOption, _React$Component4);

  function IndividualOption(props) {
    _classCallCheck(this, IndividualOption);

    var _this5 = _possibleConstructorReturn(this, (IndividualOption.__proto__ || Object.getPrototypeOf(IndividualOption)).call(this, props));

    _this5.state = {
      optionToSend: ''
    };
    return _this5;
  }

  _createClass(IndividualOption, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement(
        'li',
        { key: this.props.option, className: 'option' },
        this.props.option,
        React.createElement(
          'span',
          { className: 'singleRemove', onClick: function onClick(e) {
              _this6.props.removeOption(_this6.props.option);
            } },
          'x'
        )
      );
    }
  }]);

  return IndividualOption;
}(React.Component);

var ControlPanel = function (_React$Component5) {
  _inherits(ControlPanel, _React$Component5);

  function ControlPanel() {
    _classCallCheck(this, ControlPanel);

    return _possibleConstructorReturn(this, (ControlPanel.__proto__ || Object.getPrototypeOf(ControlPanel)).apply(this, arguments));
  }

  _createClass(ControlPanel, [{
    key: 'render',
    value: function render() {

      var form = React.createElement(
        'div',
        { className: 'container padding-zero' },
        React.createElement(
          'form',
          { className: 'optionForm', onSubmit: this.props.addOption },
          React.createElement('input', { type: 'text', name: 'option', placeholder: 'New Option' }),
          React.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary', id: 'addButton' },
            ' ',
            React.createElement('i', { className: 'fas fa-plus' })
          )
        ),
        React.createElement(
          'button',
          { disabled: !this.props.hasOptions, type: 'submit', className: 'btn btn-primary robotShuffler', id: 'shuffleButton', onClick: this.props.pickOption },
          React.createElement('i', { className: 'fas fa-random' })
        )
      );

      var bubble = React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'resultMask' }),
        React.createElement(
          'div',
          { className: 'resultBox' },
          React.createElement(
            'div',
            { className: 'close' },
            React.createElement(
              'button',
              { name: 'closeButton', onClick: this.props.toggleResultbubble },
              'x'
            )
          ),
          React.createElement(
            'h3',
            null,
            'You should propably go with:'
          ),
          React.createElement(
            'p',
            { className: 'pickedAnswer' },
            this.props.pickedOption
          )
        )
      );

      if (this.props.currentBubbleState) {
        return bubble;
      } else {
        return form;
      }
    }
  }]);

  return ControlPanel;
}(React.Component);

var Footer = function Footer() {
  return React.createElement(
    'footer',
    { className: 'mastfoot mt-auto' },
    React.createElement(
      'div',
      { className: 'inner' },
      React.createElement(
        'p',
        null,
        React.createElement('i', { className: 'fab fa-react first' }),
        ' ',
        React.createElement('i', { className: 'fas fa-plus middle' }),
        ' ',
        React.createElement('i', { className: 'fa fa-heart last' })
      )
    )
  );
};

// -------------------------------------------------------
// JSX Renderer
var renderForm = function renderForm() {

  ReactDOM.render(React.createElement(IndecisionApp, null), appRoot);
};

renderForm();
