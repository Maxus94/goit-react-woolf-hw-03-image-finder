import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.props.toggleModal}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}
