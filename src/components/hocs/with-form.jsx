import React, {PureComponent} from "react";
import Toast from "../toast/toast";
import PropTypes from 'prop-types';

const SHAKE_ANIMATION_TIMEOUT = 600;

const shake = (ref, callback) => {
  const shakeClass = ` shake`;
  ref.current.className += shakeClass;

  setTimeout(() => {
    callback();
    const classNames = ref.current.className;
    ref.current.className = classNames.slice(0, -shakeClass.length);
  }, SHAKE_ANIMATION_TIMEOUT);
};

const errorMessage = `Something went wrong. Please try later.`;

const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFormDisabled: false,
        toastText: false
      };

      this.formRef = React.createRef();

      this.setState = this.setState.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(isValid) {
      if (!isValid) {
        this.setState({isFormDisabled: true});
        shake(
            this.formRef,
            () => {
              this.setState({isFormDisabled: false});
            }
        );
        return;
      }
    }
    componentDidUpdate() {
      if (this.props.isErrorToastTextNeeded) {
        this.setState({toastText: errorMessage});
      }
      // if (this.props.isSendingDataStatusNotInitial) {
      //   this.props.onResetStatus();
      // }
      if (!this.formRef.current.classList.contains(`shake`)) {
        this.setState({isFormDisabled: this.props.isSendingForm});
      }
    }
    componentWillUnmount() {
      if (this.props.isSendingDataStatusNotInitial) {
        this.props.onResetStatus();
      }
    }
    render() {
      return <Component {...this.props} onSubmit={this.onSubmit} setToastText={this.setState} isFormDisabled={this.state.isFormDisabled} ref={this.formRef}>
        {
          this.state.toastText
            ? <Toast text={this.state.toastText} />
            : ``
        }
      </Component>;
    }
  }

  WithForm.propTypes = {
    isErrorToastTextNeeded: PropTypes.bool.isRequired,
    isSendingForm: PropTypes.bool.isRequired,
    isSendingDataStatusNotInitial: PropTypes.bool.isRequired,
    onResetStatus: PropTypes.bool.isRequired,
  };

  return WithForm;
};

export default withForm;
