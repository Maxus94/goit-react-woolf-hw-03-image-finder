import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getDataAPI } from 'api/gallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
const PER_PAGE = 12;
let totalPictures = 0;
let modalImage = null;

export class App extends Component {
  state = {
    pictures: null,
    loading: false,
    searchText: '',
    page: 1,
    isShownModal: false,
  };

  handleModalImage = picture => {
    modalImage = picture;
    this.toggleModal()
    console.log(modalImage);
  };

  toggleModal = () =>
    this.setState(prev => ({
      isShownModal: !prev.isShownModal,
    }));

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText
    ) {
      this.getData(this.state.searchText, this.state.page);
    }
  }

  getData = async searchString => {
    try {
      this.setState({ loading: true });
      const data = await getDataAPI(searchString, this.state.page);
      //this.setState({ pictures: data });
      this.setState(prev => ({
        pictures: prev.pictures ? [...prev.pictures, ...data.hits] : data.hits,
      }));
      this.setState({ loading: false });
      totalPictures = data.totalHits;
      console.log(data);
    } catch (error) {
      console.log(error, 'in App');
    }
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSubmit = searchString => {
    // console.log(searchString, this.state.searchText);
    if (searchString === this.state.searchText) {
      alert('already loaded');
      return;
    }
    this.setState({
      pictures: null,
      page: 1,
      searchText: searchString,
    });
    //this.searchText = evt.target.text.value;
    //evt.target.text.value='';
    //this.getData(evt.target.text.value);
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
        {this.state.pictures &&
          this.state.pictures.length >= PER_PAGE &&
          this.state.pictures.length < totalPictures &&
          !this.state.loading && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}
        {this.state.isShownModal && (
          <Modal toggleModal={this.toggleModal}><img src={modalImage} alt="" /></Modal>
        )}
      </div>
    );
  }
}

// style={{
//   height: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: 40,
//   color: '#010101'
// }}
