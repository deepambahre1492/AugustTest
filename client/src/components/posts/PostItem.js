import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux';
import {addLike,RemoveLike,deletePost} from '../../actions/post';

const PostItem = ({addLike,RemoveLike,deletePost,auth,post:{_id,description,title,name,avatar,user,likes,comments,date},showActions}) =>
<div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {title}
            </p>
            <p class="my-1">
             {description}
            </p>
            <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            {showActions && <Fragment>
              <button onClick={e => addLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"/>{' '}
              <span>{likes.length > 0 && (
                <span>{likes.length}</span>
              )}</span>
            </button>
            <button onClick={e => RemoveLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to ={`/posts/${_id}`} class="btn btn-primary">
              Comments {comments.length > 0 && (
                <span class='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id &&(
            <button onClick={e =>deletePost(_id)}     
            type="button"
            class="btn btn-danger"
             >
            <i class="fas fa-times"></i>
          </button>
            )}
            </Fragment>
            }
            
          </div>
        </div>

PostItem.defaultProps = {
  showActions:true
}
PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   addLike:PropTypes.func.isRequired,
   RemoveLike:PropTypes.func.isRequired,
   deletePost:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    auth:state.auth
});
export default connect(mapStateToProps,{addLike,RemoveLike,deletePost})(PostItem)