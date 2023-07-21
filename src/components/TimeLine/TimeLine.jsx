import { useEffect } from 'react';
import './TimeLine.css'
import $ from 'jquery';
import gifButton from '../../img/gifbutton.gif'
import gif2 from '../../img/gif2.gif'
import gif3 from '../../img/gif3.gif'
import gif4 from '../../img/gif4.gif'
import gif5 from '../../img/gif5.gif'
import gif6 from '../../img/gif6.gif'

function TimeLine(){

  useEffect(() => {
    const doAnimations = () => {
      const offset = window.scrollY + window.innerHeight;
      const $animatables = $('.animatable');

      if ($animatables.length === 0) {
        $(window).off('scroll', doAnimations);
      }

      $animatables.each(function () {
        const $animatable = $(this);
        if ($animatable.offset().top + $animatable.height() - 20 < offset) {
          $animatable.removeClass('animatable').addClass('animated');
        }
      });
    };

    $(window).on('scroll', doAnimations);
    $(window).trigger('scroll');

    return () => {
      $(window).off('scroll', doAnimations);
    };
  }, []);
    return(
        <div className='backgroundB'>
    <div className="container marginB">
    <h1 className='titlePad1 yellowp'>Your own personal designer, AI developer.</h1>
    <div className="page-header">
    </div>
    <ul className="timeline">
      
        <li>
          
          <div className="timeline-badge"></div>
          <div className="timeline-panel block animatable bounceInLeft">
            <div className="timeline-heading">
              <img src={gifButton} alt="" className='gifB' />
              <h4 className="timeline-title">
Create, design and customize buttons with different styles, colors and sizes.</h4>
            </div>
            <div className="timeline-body">
            </div>
          </div>
        </li>
        <li className="timeline-inverted">
          <div className="timeline-badge "></div>
          <div className="timeline-panel animatable bounceInRight">
            <div className="timeline-heading">
              <img src={gif2} alt=""  className='gifB'/>
              <h4 className="timeline-title">NavBars</h4>
            </div>
            <div className="timeline-body">
              <p>...</p>
            </div>
          </div>
        </li>
        <li>
          <div className="timeline-badge"><i className="glyphicon glyphicon-credit-card"></i></div>
          <div className="timeline-panel block animatable bounceInLeft">
            <div className="timeline-heading">
            <img src={gif3} alt="" className='gifB' />
              <h4 className="timeline-title">Amazing Cards</h4>
            </div>
            <div className="timeline-body">
              <p>...</p>
            </div>
          </div>
        </li>
        <li className="timeline-inverted">
          <div className="timeline-panel animatable bounceInRight">
            <div className="timeline-heading">
            <img src={gif4} alt="" className='gifB' />
              <h4 className="timeline-title">Responsive CSS Grid</h4>
            </div>
            <div className="timeline-body">
              <p>...</p>
            </div>
          </div>
        </li>
        <li>
          <div className="timeline-badge"><i className="glyphicon glyphicon-floppy-disk"></i></div>
          <div className="timeline-panel block animatable bounceInLeft">
            <div className="timeline-heading">
            <img src={gif5} alt="" className='gifB' />
              <h4 className="timeline-title">Easy and Beautifull Tables</h4>
            </div>
            <div className="timeline-body">
              <p>...</p>
              
            
            </div>
          </div>
        </li>
        <li>
        </li>
        <li className="timeline-inverted">
          <div className="timeline-badge"><i className="glyphicon glyphicon-thumbs-up"></i></div>
          <div className="timeline-panel animatable bounceInRight">
            <div className="timeline-heading">
            <img src={gif6} alt="" className='gifB' />
              <h4 className="timeline-title"> Unbelievable Landings!</h4>
            </div>
            <div className="timeline-body">
              <p>...</p>
            </div>
          </div>
        </li>
    </ul>
</div>

        </div>
    )
}


export default TimeLine;