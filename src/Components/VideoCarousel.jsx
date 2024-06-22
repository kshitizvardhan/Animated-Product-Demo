import React, { useRef, useState, useEffect } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([])

    // destructuring the values for easy syntax further
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;

    useGSAP(() => {
        gsap.to("#slider",{
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut",
        })
        gsap.to("#video",{
            scrollTrigger:{
                trigger: "#video",   // what to trigger, when in view ??
                toggleActions: "restart none none none" // when it comes first into the view, else others are none
            },
            onComplete: () => {
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    },[isEnd, videoId])

    const handedLoadedMetadata = (index, event) => setLoadedData((prevVideo) => [...prevVideo, event])  // spread the previous data and add the new event also

    // this useEffect will deal with the playing of the video
    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])
    
    

    // this useEffect deal with the the animating progress of the video
    useEffect(() => {
      let currentProgress = 0;
      let span = videoSpanRef.current;

      if(span[videoId]) {   // if we have the span of the video id, then we can start animating it
        // here we will animate the progress of the video
        let anim = gsap.to(span[videoId],{
            onUpdate: () => {
                const progress = Math.ceil(anim.progress() * 100);
                if(progress != currentProgress) {
                    currentProgress = progress;
                    gsap.to(videoDivRef.current[videoId], {
                        width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw"
                    })

                    gsap.to(span[videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: "white"
                    })
                }
            },
            onComplete: () => {
                if(isPlaying){  // on complete, we will bring it back to dot.
                    gsap.to(videoDivRef.current[videoId], {
                        width: "12px",
                    })
                    gsap.to(span[videoId], {
                        backgroundColor: "#afafaf",
                    })
                }
            }
        })

        if(videoId === 0){
            anim.restart();
        }

        const animUpdate = () => {
            anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            // this math shall give us the progress, divided the ref by the total video duration.
        }

        if(isPlaying){
            // ticker is used to add the progress to bar
            gsap.ticker.add(animUpdate);
        }else {
            gsap.ticker.remove(animUpdate);
        }

      }
    }, [videoId, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isEnd: true,
                    videoId: i + 1
                }))
                break;
            case "video-last":
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: true,
                }))
                break;
            case "video-reset":
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: false,
                    videoId: 0,
                }))
                break;
            case "play":
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying
                }))
                break;
            case "pause":
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying
                }))
                break;
            default:
                return video;
        }
    };
    

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list,index) => (
                    <div key={list.id} id='slider' className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video 
                                    id='video' 
                                    
                                    playsInline={true} preload='auto' 
                                    
                                    muted 
                                    
                                    className={`${list.id === 2 && "translate-x-44"} pointer-events-none`}

                                    ref={(element) => (videoRef.current[index] = element)} 
                                    
                                    onEnded={()=> index !== 3 ? handleProcess("video-end",index) : handleProcess("video-last")}
                                    
                                    onPlay={() => {setVideo((prevVideo) => ({
                                        ...prevVideo,
                                        isPlaying: true
                                    }))}}
                                    
                                    onLoadedMetadata={(e) => handedLoadedMetadata(index, e)}
                                >
                                    <source src={list.video} type='video/mp4'/>
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, index) => (
                                    <p key={index} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex-center relative mt-10'>
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {videoRef.current.map((_ , i) => (
                        <span key={i} ref={(element) => videoDivRef.current[i] = element} className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
                            <span className='absolute h-full w-full rounded-full' ref={(element) => videoSpanRef.current[i] = element} />
                        </span>
                    ))}
                </div>
                <button className='control-btn'>
                    <img 
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={isLastVideo ? () => handleProcess("video-reset") : !isPlaying ? () => handleProcess("play") : () => handleProcess("pause")} 
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel