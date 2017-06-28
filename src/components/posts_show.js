import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost, deletePost} from '../actions';

// posts show needs to be responsible for fetching its own data
// consider two scenarios - 1) user visits PostsIndex first - fetch list of all blog posts
// 2) user visits PostsShow first with a particular ID - only want to fetch that post
// must always assume user may visit any page in the app directly, not always through index
class PostsShow extends Component {
    componentDidMount() {
        // when you refresh the page, you fetch the entire list of posts
        // but our individual postshow page will also attempt to refetch the post as well
        // we're basically fetching every record twice: once for index page, and once for show page
        // good to always assume you're working with stale data - so refetch records when going to show page
        // if you don't want to eagerly refetch posts, wrap this block in this if statement:
        // if(!this.props.post) {

            // access the token (id) in the URL
            // this.props.match.params.id;      // provided by react router
            // params object lists all the wildcard tokens in the url, in this case, only :id
            const {id} = this.props.match.params;   // destructure above line
            this.props.fetchPost(id);
        // }

        // about caching:
        // if you loaded an individual page directly, you only fetch the data required for that page
        // so youre post piece of state contains only the post you fetched
        // if you click back to index, then you will only see this post appear on the screen (the title)
        // then once the index request completes as well, you'll see all the other posts appear as well.
    }

    onDeleteClick() {
        // return to index after delete
        // challenge: making use of react router with action creators
        // with react router we have the ability to easily navigate around programmatically with code that is written
        // inside of a component. as soon as you put code outside of components, navigating around starts to get
        // challening. one way to handle that is by passing callbacks to our action creators that will take care of the
        // navigation after the action creator has completed executing
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');   // programmatic navigation
        });
    }

    render() {
        // below line uses big list of posts - we only want a single post
        // posts[this.props.match.params.id];  // the post we want to show
        // this.props === ownProps

        // by using ownProps in mapStateToProps, we can avoice doing something like this everywhere in the component:
        // this.props.posts[this.props.match.params.id];

        const {post} = this.props;


        // note our component is being rendered to screen before we even attempt to fetch our post
        // during that time, we don't have any post with the correct id sitting in memory
        // so post is coming in as undefined
        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-primary">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// destructure state, we only want posts, so use {posts}
// but this is the big list of posts and we only want one post
// the id in the url is the important piece of state
// ownProps - props object that is going to the component (PostsShow), named so by convention
// whenever the postshow component is about to be rendered/rerendered, mapStateToProps gets called to figure out what
// props the component needs, and mapStateToProps gets passed all the props that were headed to PostsShow
// remember the second arg is the set of props that are going to the target component - this makes mapstatetoprops
// a good place to do some intermediate calculation e.g. lookup, check out video on reselect
function mapStateToProps({posts}, ownProps) {
    // return {posts};
    // in some large projects, mapStatetoProps may be loaded in separate file
    // less data dependency, more reusable - postshow can focus on showing the component
    return { post: posts[ownProps.match.params.id]};    // return the single post that we care about
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);