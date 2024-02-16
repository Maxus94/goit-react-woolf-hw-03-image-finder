import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state={
    searchText: ''
  }

  handleChange = evt => {
    evt.preventDefault();
    console.log(evt.target.value);
    this.setState({
      searchText: evt.target.value,
    });
  };
  render(){return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={()=>this.props.handleSubmit(this.state.searchText)}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input onChange={this.props.handleChange}
          className={css.input}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  )};
};
