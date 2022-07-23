import * as React from 'react';
import Layout from '../components/Layout'
import House from '../components/House'

const Houses = ({ data }) => {

    return (
        <Layout>
            <House page={true} />
        </Layout>
    );
};

export default Houses;
