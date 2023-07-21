import React, { useEffect, useState } from 'react';
import './HomePage.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import imagesLoaded from 'imagesloaded';
import $ from 'jquery';
import TimeLine from '../../components/TimeLine/TimeLine';
//bootstrap
import bulbo2 from '../../img/icons/bulbo2.png';
import gif1 from '../../img/textures/gif4.gif'
import gif2 from '../../img/textures/gif2.gif'
import gif3 from '../../img/textures/gif3.gif'
import gif5 from '../../img/textures/gif5.gif'

function HomePage({ theme, setTheme }) {
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const images = gsap.utils.toArray('img');
    const loader = document.querySelector('.loader--text');
    const updateProgress = (instance) => {
      let progress = 0;
      const interval = setInterval(() => {
        loader.textContent = `${progress}%`;
        progress++;
        if (progress > (instance.progressedCount * 100) / images.length) {
          clearInterval(interval);
        }
      }, 10);
    };

    const showDemo = () => {
      document.body.style.overflow = 'auto';
      document.scrollingElement.scrollTo(0, 0);
      gsap.to(document.querySelector('.loader'), { autoAlpha: 0, delay: 0.5 });

      
      gsap.utils.toArray('section').forEach((section, index) => {
        const w = section.querySelector('.wrapper');
        const [x, xEnd] = index % 2 ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * 1, 1];
        gsap.fromTo(
          w,
          { x },
          {
            x: xEnd,
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
            },
          }
        );
      });
    
      gsap.from('.title', {
        opacity: 0,
        y: 100,
        duration: 0.8,
        delay: 0.2,
      });

      setIsLoading(false);
    };

    imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);
  }, []);

  const viewport = $(window);
  const root = $('.html');
  let maxScroll;

  viewport.on({
    scroll: function () {
      const scrolled = viewport.scrollTop();
      root.css({ fontSize: (scrolled / maxScroll) * 50 });
    },
    resize: function () {
      maxScroll = root.height() - viewport.height();
    },
  }).trigger('resize');

  return (
    <div className="containerr">
      <div className="loader df aic jcc">
        <div className="loadingClass">
          <h1>Loading</h1>
          <h2 className="loader--text">0%</h2>
        </div>
      </div>

      <div className="demo-wrapper">
        <div className='containter' id='banner'> {/** main*/}
          <div className='widthT'>
            <div> 
            <h1 className='title' id='aipowered'> 	<span className='yellowB'>&#10100; AI-powered &#10101;</span>strategy creation</h1>
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span > <a href="/createwithia" class="button-text" id='noSub'>Free Trial</a></span>
            </button>
            </div>
            <div>
              <label className="lamp-container">
                <input className="control"
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  readOnly
                />
                <div className="glare"></div>
                <div className="hook">
                  <div className="hook-element"></div>
                </div>
                <div className="base">
                  <div className="base-container">
                    <div className="depth"></div>
                  </div>
                  <div className="light">
                    <div className="light-bulb"></div>
                  </div>
                </div>
                <div className="support">
                  <div className="leg-container">
                    <div className="leg-support"></div>
                    <div className="leg-support"></div>
                    <div className="leg-support"></div>
                  </div>
                </div>
                <div className="additionalLight"></div>
                <div className="shadow"></div>
                <div className="background"></div>
                <div className="headline-container"></div>
              </label>
              <label className="text"></label>
            </div>
            

        
            </div>
        </div>
        
        <section className="demo-gallery gallery2">
          <ul className="wrapper">
            <li>
              <img
                src={gif1}
                alt="Gallery Image 4"
              />
            </li>
            <li>
              <img
                src={gif2}
                alt="Gallery Image 5"
              />
            </li>
            <li>
              <img
                src={gif3}
                alt="Gallery Image 6"
              />
            </li>
          </ul>

          
        </section>
  

        <TimeLine />

      </div>
    </div>
  );
}

export default HomePage;
