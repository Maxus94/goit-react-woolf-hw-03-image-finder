import css from './Searchbar.module.css';

export const Searchbar = props => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={props.handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
