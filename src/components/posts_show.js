import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';

// posts show needs to be responsible for fetching its own data
// consider two scenarios - 1) user visits PostsIndex first - fetch list of all blog posts
// 2) user visits PostsShow first with a particular ID - only want to fetch that post
// must always assume user may visit any page in the app directly, not always through index
class PostsShow extends Component {
    componentDidMount() {
        // access the token (id) in the URL
        // this.props.match.params.id;      // provided by react router
                                            // params object lists all the wildcard tokens in the url, in this case, only :id
        const {id} = this.props.match.params;   // destructure above line
        this.props.fetchPost();
    }
    render() {
        // below line uses big list of posts - we only want a single post
        // posts[this.props.match.params.id];  // the post we want to show
        // this.props === ownProps

        // by using ownProps in mapStateToProps, we can avoice doing something like this everywhere in the component:
        // this.props.posts[this.props.match.params.id];

        return (
            <div>
                Posts Show!
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
function mapStateToProps({posts}, ownProps) {
    // return {posts};
    // in some large projects, mapStatetoProps may be loaded in separate file
    // less data dependency, more reusable - postshow can focus on showing the component
    return { post: posts[ownProps.match.params.id]};    // return the single post that we care about
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);