import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };

        if (this.props.showError === false) {
            this.state.error = null;
            this.state.errorInfo = null;
        }
    }

    componentDidCatch = (error, info) => {
        console.log("error did catch");
        this.setState({ error: error, errorInfo: info });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="error-bound">
                    An Error Occurred !
                </div>
            );
        }
        else {
            return this.props.children;
        }
    }
}
