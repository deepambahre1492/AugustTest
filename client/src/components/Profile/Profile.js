import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from'../layout/spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import {getProfileById} from '../../actions/profile'
import ProfileUser from './ProfileUser'
import { Link } from 'react-router-dom'

const Profile = ({
    getProfileById,
    profile:{profile,loading},
    auth,
    match
})=>{
    useEffect(() => { 
        getProfileById(match.params.id);
    },[getProfileById,match.params.id]);      
      return (
        <Fragment>
          {profile === null || loading ?(
              <Spinner/>
          ):(
              <Fragment>
                  <Link to ='/profiles' className='btn btn-light'>
                      Back to Profiles
                  </Link>
                  {auth.isAuthenticated &&auth.loading === false && auth.user._id===profile.user._id &&(
                      <Link to ='/edit-profile' className ='btn btn-dark'>
                          Edit Profile
                      </Link>
                  )}
                  <div class="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile ={profile}/>
                    <div class="profile-exp bg-white p-2">
                      <h2 class="text-primary">Experience</h2>
                      {profile.experience.length > 0 ? (
                          <Fragment>
                            {profile.experience.map(experience =>(
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                          </Fragment>
                      ):(<h4> No experience Credentials </h4>)}
                    </div>

                    <div class="profile-edu bg-white p-2">
                      <h2 class="text-primary">User</h2>
                      {profile.user.length > 0 ? (
                          <Fragment>
                            {profile.user.map(user =>(
                                <ProfileUser key={user._id} user={user}/>
                            ))}
                          </Fragment>
                      ):(<h4> No user Credentials </h4>)}
                    </div>
                  </div>
                  </Fragment>
          )}
        </Fragment>
    );
};

Profile.propTypes = {
   getProfileById:PropTypes.func.isRequired,
   profile:PropTypes.object.isRequired,
   auth:PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToProps,{getProfileById})(Profile);
