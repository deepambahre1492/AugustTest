import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteUser} from '../../actions/profile';


const User = ({user,deleteUser}) => {
    const edu = user.map(edu=>(
       <tr key={edu._id}>
           <td>{edu.school}</td>
           <td className="hide-sm">{edu.degree}</td>
           <td>
            <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {edu.to ===null ? ('Now'):
                (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
            }
           </td>
           <button className ='btn btn-danger'onClick={() =>deleteUser(edu._id)}>Delete</button>
       </tr>
    ));
    return (
        <Fragment>
            <h2 classNam="my-2">User Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Personal</th>
                        <th className="hide-sm">Name</th>
                        <th className="hide-sm">Age</th>
                    </tr>
                </thead>
                <br></br>
                <tbody>{edu}</tbody>
            </table>
        </Fragment>
    )
};

User.propTypes = {
    u:PropTypes.array.isRequired,
    deleteUser:PropTypes.func.isRequired,

}

export default connect(null,{deleteUser})(User);
