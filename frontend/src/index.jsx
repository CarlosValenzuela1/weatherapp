import React from 'react';
import ReactDOM from 'react-dom';

// const baseURL = process.env.ENDPOINT;
const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = async (lon, lat) => {
  try {
    const response = await fetch(`${baseURL}/weather?lon=${lon}&lat=${lat}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      timeStamp: '',
    };
  }

  async componentDidMount() {
    await this.getWeatherByGeoLocation();
  }

  async getWeatherByGeoLocation() {
    window.navigator.geolocation.getCurrentPosition(async (pos) => {
      if (pos.coords) {
        const { longitude, latitude } = pos.coords;
        const weather = await Promise.all([getWeatherFromApi(longitude, latitude)]);
        this.setState({ icon: weather[0].response.icon.slice(0, -1) });
        this.setState({ timeStamp: weather[0].timestamp });
      }
    });
  }

  render() {
    const { icon, timeStamp } = this.state;

    return (
      <div>
        <div className="icon">
          {icon && <img alt="weather" src={`/img/${icon}.svg`} />}
          Forecast for:
          {' '}
          {timeStamp}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
