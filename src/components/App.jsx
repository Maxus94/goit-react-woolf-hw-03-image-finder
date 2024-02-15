import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getDataAPI } from 'api/gallery';
import { Loader } from './Loader/Loader';

export class App extends Component {
  searchText = '';
  
  state = {
    pictures: null
  }

  getData = async (searchString)=>{
    const data = await getDataAPI(searchString);
    this.setState({pictures: data});
    // console.log(data.hits);
  }

  handleSubmit = evt => {
    evt.preventDefault();    
    this.searchText = evt.target.text.value;
    //evt.target.text.value='';
    this.getData(evt.target.text.value);
  };
  render() {
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        {this.state.pictures&&<ImageGallery pictures = {this.state.pictures.hits}/>}
        {!this.state.pictures&&<Loader/>}
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
