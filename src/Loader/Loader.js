import React from 'react';
import PropTypes from 'prop-types';
import { loaderService } from './LoaderService';

class Loader extends React.Component {
    
    get name() {
        return this.props.name;
    }

    get group() {
        return this.props.group;
    }

    get show() {
        return this.state.show;
    }

    set show(show) {
        this.setState({ show });
    }
    
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: this.props.hasOwnProperty('show') ? this.props.show : false
        };

        if (this.props.hasOwnProperty('loaderService')) {
            this.loaderService = this.props.loaderService;
        } else {
            this.loaderService = loaderService;
        }

        this.loaderService._register(this);
    }

    componentWillUnmount() {
        this.loaderService._unregister(this);
    }

    render() {
        let divStyle = { display: 'inline-block' };
        if (this.state.show) {
            const { loadingImage } = this.props;
            return (
                <div style={divStyle}>
                    {loadingImage && <img src={loadingImage}  alt=''/>}
                    {this.props.children}
                </div>
            );
        }
        return (<div style={divStyle}></div>);
    }
}

Loader.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    loadingImage: PropTypes.string
}

export default Loader