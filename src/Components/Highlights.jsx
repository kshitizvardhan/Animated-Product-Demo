import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'
import { animateWithGsap } from '../utils/animation'

const Highlights = () => {
  useGSAP(() => {
    animateWithGsap("#title",
      { opacity: 1, y: 0 }
    )
    animateWithGsap(".link",{ opacity:1, y:0, duration: 0.9, stagger: 0.25})
  }, [])

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the Film
              <img src={watchImg} alt="watch film" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="watch event" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
}

export default Highlights