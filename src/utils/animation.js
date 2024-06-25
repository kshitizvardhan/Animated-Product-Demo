import gsap from "gsap";

export const animateWithGsap = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            toggleActions: "restart reverse restart reverse",
            start: "top 85%",
            ...scrollProps,
        }
    })
};



export const animationWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: "power2.inOut"
    })
    timeline.to(firstTarget,{
        ...animationProps,
        ease:"power2.inOut"
    }, "<") 
    
    // this "<" symbolises to insert the animation at start of the previous animation
    
    timeline.to(secondTarget,{
        ...animationProps,
        ease:"power2.inOut"
    }, "<")
}

/*

toggleActions: Determines how the linked animation is controlled at the 4 distinct toggle places - onEnter, onLeave, onEnterBack, and onLeaveBack, in that order. 
The default is play none none none. 
So toggleActions: "play pause resume reset" will play the animation when entering, pause it when leaving, resume it when entering again backwards, and reset (rewind back to the beginning) when scrolling all the way back past the beginning. 

We can use any of the following keywords for each action: "play", "pause", "resume", "reset", "restart", "complete", "reverse", and "none".

*/