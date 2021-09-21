import React, { Component } from "react";
import { subscribeGetPesoBal } from './api';
import { subscribeGetEstadoBal } from './api';
export default class SocketBalanza extends Component {

    constructor(props) {
        super(props);
        subscribeGetPesoBal((err, pesobalanza) => this.setState({pesobalanza}));
        subscribeGetEstadoBal((err, estadobalanza) => this.setState({estadobalanza}))

    }
    state = {
        pesobalanza: 'no hay pesos para mostrar'
    };

    render() {
        return (
            <div className="App">
            <p className="App-intro"> ESTADO BALANZA: {this.state.estadobalanza}</p>
            <p className="App-intro"> PESO BALANZA: <strong>{this.state.pesobalanza}</strong></p>
        </div>
    );
    }
}