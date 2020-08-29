import React,{useEffect, Fragment} from 'react'
//eslint-disable-next-line
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Spinner} from '../layout/spinner';
// eslint-disable-next-line
import Dashboardactions, { Dashboardaction } from './dashboardaction'
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
//eslint-disable-next-line
import Experience from './Experience';
//eslint-disable-next-line
import User from './User';
const Dashboard = ({getCurrentProfile,deleteAccount,auth:{user},profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);
    
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Welcome {user&&user.name}
        </p>
    </Fragment>;
};

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
    deleteAccount:PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
