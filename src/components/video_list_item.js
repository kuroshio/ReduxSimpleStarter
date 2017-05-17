import React from 'react';

const VideoListItem = ({video}) => {
// Below works the same:
// const VideoListItem = (props) => {
//  const video = props.video;  // passed in video attribute in video_list

    // console.log(video)
    const imageUrl = video.snippet.thumbnails.default.url   // from youtube

    return (
        <li className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>
                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    )
}

export default VideoListItem