import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getDataAPI } from 'api/gallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import css from './App.module.css';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    pictures: [],
    loading: false,
    searchText: '',
    page: 1,
    buttonIsShown: false,
    isShownModal: false,
    errorIsShown: false,
    modalImage: false,
  };

  handleModalImage = picture => {
    this.setState({ modalImage: picture });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prev => ({
      isShownModal: !prev.isShownModal,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText
    ) {
      this.getData(this.state.searchText, this.state.page);
    }
    if (prevState.pictures?.length < this.state.pictures?.length) {
      window.scrollBy({
        top: 260 * 3 + 48,
        behavior: 'smooth',
      });
    }
  }

  getData = async searchString => {
    try {
      this.setState({ loading: true });
      const data = await getDataAPI(searchString, this.state.page, PER_PAGE);
      this.setState(prev => ({
        pictures: prev.pictures ? [...prev.pictures, ...data.hits] : data.hits,
      }));
      this.setState({
        buttonIsShown: this.state.page < Math.ceil(data.totalHits / PER_PAGE),
      });
    } catch (error) {
      this.setState({ errorIsShown: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSubmit = searchString => {
    if (searchString === this.state.searchText) {
      alert('Please, enter new text for search');
      return;
    }
    this.setState({
      pictures: [],
      loading: false,
      page: 1,
      buttonIsShown: false,
      isShownModal: false,
      errorIsShown: false,
      modalImage: false,
      searchText: searchString,
    });
  };
  render() {
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.pictures && (
          <ImageGallery
            pictures={this.state.pictures}
            toggleModal={this.toggleModal}
            handleModalImage={this.handleModalImage}
          />
        )}
        {this.state.loading && <Loader />}
        {this.state.errorIsShown && (
          <h2 className={css.errorMessage}>Error of loading</h2>
        )}
        {this.state.buttonIsShown && !this.state.loading && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {!this.state.errorIsShown &&
          !this.state.loading &&
          this.state.pictures.length === 0 && (
            <h2 className={css.message}>Nothing was found</h2>
          )}
        {!this.state.errorIsShown &&
          !this.state.loading &&
          !this.state.buttonIsShown &&
          this.state.pictures.length > 0 && (
            <h2 className={css.message}>End of collection was reached</h2>
          )}
        {this.state.isShownModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={this.state.modalImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
