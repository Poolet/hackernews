import React from 'react';
import BulletList from 'react-content-loader';
import PropTypes from 'prop-types';

const Loader = () => (
    <BulletList>
        <rect x="0" y="17" rx="4" ry="4" width="300" height="10" />
        <rect x="0" y="40" rx="3" ry="3" width="300" height="10" />
        <rect x="0" y="63" rx="2" ry="2" width="300" height="10" />
        <rect x="0" y="86" rx="1" ry="1" width="300" height="10" />
    </BulletList>
);

Loader.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Loader