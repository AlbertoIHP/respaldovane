import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        }
    }

    showModal() {
        this.setState({ display: 'block' });
    }

    hideModal() {
        this.setState({ display: 'none' });
    }

    closeOnBackground(e) {
        if (e.target.id == 'modal') {
            this.hideModal();
        }
    }

    render() {
        return (
            <span>
                <div id="modal" style={this.state} onClick={(e) => this.closeOnBackground(e)}>
                    <span className="modal-close" onClick={(e) => this.hideModal(e)}>x</span>
                    {this.props.content}
                </div>
            </span>
        );
    }
}


export default Modal;
