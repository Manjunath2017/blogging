import React, { Component } from 'react';
import RouteTo from './router/router';
class App extends Component {
  render() {
    return (
    // <p className="" style={{padding:'10px',position:"absolute", bottom:"8px",color:"#000" }}> Blogger by Manjunath Jadhav</p>
      <div style={{ border: '1px solid #6c757d' }}>
        <RouteTo />
        <br />
        <svg viewBox="0 0 1040 130" class="svg-size">
        <path fill="#343a40" fill-opacity="1" d="M0,96L40,85.3C80,75,160,53,240,53.3C320,53,400,75,480,90.7C560,107,640,117,720,106.7C800,96,880,64,960,53.3C1040,43,1120,53,1200,48C1280,43,1360,21,1400,10.7L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
        </path>
        </svg>
      </div>
    )
  }
}
export default App;