import React, {useEffect} from 'react'
import VideoPlayer from 'react-video-js-player';

const Video = ({url, poster = null}) => {

    const onVideoPause = (duration) => {
        // console.log('Video pausado : ' + Math.round(duration) + ' seconds') 
    }

    const onVideoPlay = (duration) => {
        // console.log("Video played at: ", duration);

    }

    const onVideoEnd = () => {
        // console.log("Video ended");
    }

    const onPlayerReady = (player) => {
        // console.log("Player is ready: ", player);
    }

    useEffect(() => {
        // console.log('en el useffect de VIDEO.JSX')
        // Para desmontarlo del DOM
        return () => { 
            // console.log("componentWillUnmount"); 
        }
    },[])

    return (
        <div className="">
            <VideoPlayer
                controls={true}
                src={url}
                poster={poster}
                playbackRates ={ [0.5, 1, 1.5, 2]}
                autoplay={false}
                bigPlayButtonCentered={true}
                onReady={onPlayerReady.bind(this)}
                onPlay={onVideoPlay.bind(this)}
                onPause={onVideoPause.bind(this)}
                onEnd={onVideoEnd.bind(this)}
                className="vjs-16-9"
            />
        </div>
    )
}

export default Video
