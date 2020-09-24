import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      shoes: [{
        "size": 7,
        "brand_name": "yeezy",
        "manufacturer": "http://127.0.0.1:8000/api/manufacturer/1/",
        "color": "http://127.0.0.1:8000/api/shoecolors/1/",
        "shoe_type": "http://127.0.0.1:8000/api/shoetype/1/",
        "material": "leather and cloth",
        "fasten_type": "lady gaga"
      }]
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/shoes/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            shoes: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>

          {this.state.shoes.map(shoe => (
            <ul key={shoe.brand_name}>
              <li>  {shoe.brand_name}  </li>
              <li>  {shoe.size}  </li>
              <li>  {shoe.color}  </li>
              <li>  {shoe.manufacturer}  </li>
              <li>  {shoe.shoe_type}  </li>
              <li>  {shoe.material}  </li>
              <li>  {shoe.fasten_type}  </li>

            </ul>

          ))}

        </div>
      );
    }
  }
}

export default App;
