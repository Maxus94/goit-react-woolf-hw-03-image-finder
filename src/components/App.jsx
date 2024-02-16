import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getDataAPI } from 'api/gallery';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    pictures: null,
    loading: false,
    searchText: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText
    ) {
      this.setState({ loading: true });
      this.getData(this.state.searchText, this.state.page);
      this.setState({ loading: false });
    }
  }

  getData = async searchString => {
    try {
      const data = await getDataAPI(searchString, this.state.page);
      this.setState({ pictures: data });
    } catch (error) {
      console.log(error, 'in App');
    }
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
        {this.state.pictures && !this.state.loading && (
          <ImageGallery pictures={this.state.pictures.hits} />
        )}
        {this.state.loading && <Loader />}
        <Button />
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
