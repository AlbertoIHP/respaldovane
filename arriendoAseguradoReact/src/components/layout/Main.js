import React, { Component } from 'react'
import Header from './Header';
import Footer from './Footer';

class Main extends Component {
    render() {
        const children = (this.props.children)

        return (
            <div>
                <Header />
                <div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Main;
