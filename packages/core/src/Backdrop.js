import React, { PureComponent } from 'react';

class Backdrop extends PureComponent {
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
