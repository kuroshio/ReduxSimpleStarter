import React, {Component} from 'react';

// posts show needs to be responsible for fetching its own data
// consider two scenarios - 1) user visits PostsIndex first - fetch list of all blog posts
// 2) user visits PostsShow first with a particular ID - only want to fetch that post
// must always assume user may visit any page in the app directly, not always through index
class PostsShow extends Component {
    render() {
        return (
            <div>
                Posts Show!
            </div>
        );
    };
}

export default PostsShow;