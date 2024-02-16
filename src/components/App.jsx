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
    console.log(this.state.pictures, 'update', prevState.pictures);
    if (
      this.state.page !== prevState.page ||
      this.state.searchText !== prevState.searchText
    ) {      
      this.setState({ loading: true });
      try {
        this.getData(this.state.searchText);
      } catch (error) {
        console.log(error);
      }
      finally{
        this.setState({ loading: false });
      }
    }//else{this.setState({pictures: prevState.pictures})}
  }

  getData = async searchString => {
    const data = await getDataAPI(searchString);
    this.setState({ pictures: data });    
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      pictures: null,
      page: 1,
      searchText: evt.target.text.value,
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
