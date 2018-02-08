import React, { Component } from 'react';

class Backdrop extends Component {
    componentDidMount() {
        document.body.classList.add('ic-has-backdrop');
    }

    componentWillUnmount() {
        document.body.classList.remove('ic-has-backdrop');
    }

    render() {
        return <div {...this.props} />;
    }
}

export default Backdrop;
