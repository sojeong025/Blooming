import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import classes from './DiaryExplain.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { GiSpellBook, GiSecretBook, GiHeartBottle } from 'react-icons/gi' 

function DiaryExplain() {
  const navigate = useNavigate();
  const [originalBgColor, setOriginalBgColor] = useState(null);
  const [originalTextColor, setOriginalTextColor] = useState(null);
  const scrollerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const getColorStyles = () => {
    const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
    const textColor = window.getComputedStyle(document.body).getPropertyValue('color');
    setOriginalBgColor(bgColor);
    setOriginalTextColor(textColor);
  };

  useEffect(() => {
    getColorStyles();

    if (!scrollerRef.current) {
      scrollerRef.current = new LocomotiveScroll({
        el: document.querySelector('.container'),
        smooth: true,
      });
    }

    const scroller = scrollerRef.current;

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".container", {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
    scroller.scrollTo(0, 0, 0);


    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");

    scrollColorElems &&
      scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
          trigger: colorSection,
          scroller: ".container",
          start: "top 50%",
          onEnter: () =>
            gsap.to("body", {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              overwrite: "auto",
            }),
          onLeaveBack: () =>
            gsap.to("body", {
              backgroundColor: prevBg,
              color: prevText,
              overwrite: "auto",
            }),
        });
      });

      return () => {
        scroller.destroy();
        scrollerRef.current = null;
        ScrollTrigger.getAll().forEach((st) => st.kill());
        
        // 원래 색상으로 변경합니다
        if (originalBgColor && originalTextColor) {
          gsap.to('body', {
            backgroundColor: originalBgColor,
            color: originalTextColor,
            overwrite: 'auto',
          });
        }
      };
    }, [location.pathname, originalBgColor, originalTextColor]);

  return (
    <div className={classes.container}>
      <div class="container">
        {/* section 1 */}
        <section  className={classes.section} data-bgcolor="#bcb8ad" data-textcolor="#032f35">
          <div>
            <p className={classes.mainText} data-scroll data-scroll-speed="3">
              메시지와 함께 전하는 <br /> <span>소중한 한 장의 기억</span>
            </p>
            <p className={classes.text}>
              시간을 되돌릴 순 없지만 <br />추억은 언제든 다시 마주할 수 있어요
            </p>
          </div>
          <img className={classes.mainImg1} src="/src/assets/diary.jpg" alt="" />
        </section>

        {/* section 2 */}
        <section className={classes.section} data-bgcolor="#f1dfe2" data-textcolor="#2b4176">
          <img className={classes.mainImg2} src="/src/assets/diary2.jpg" alt="" />
          <div className={classes.context}>
          <p className={classes.mainText} data-scroll data-scroll-speed="1">
            매일 매일이 <span>소중한 순간이</span> <br />되도록 기록해보세요</p>
          <p className={classes.text} >각자의 마음을 펼쳐 적어나가며 <br/>더욱 가까워질 수 있는 기회입니다</p>
          </div>
        </section>

        {/* <hr className={classes.hr} /> */}

        {/* section 3 */}
        <section className={classes.section} data-bgcolor="#FFFAF4" data-textcolor="#666">
          <div data-scroll data-scroll-speed="1">
          <div className={classes.Title}>다이어리 작성 방법</div>
            
            
            <div className={classes.way1}>
              <div className={classes.icon}>
                <GiHeartBottle/>
              </div>
              <div className={classes.wayTitle}>
                기념일마다 사진과 함께 <br/>
                당신의 마음을 작성해보세요
              </div>
            </div>


            <div className={classes.way2}>
              <div className={classes.icon}>
                <GiSecretBook />
              </div>
              <div className={classes.wayTitle}>
                여러분의 본식 전까지 <br/> 
                서로의 게시글은 비밀입니다
              </div>
            </div>
            
            
            <div className={classes.way3}>
              <div className={classes.icon}>
                <GiSpellBook/>
              </div>
              <div className={classes.wayTitle}>
                결혼식 후 공유와 함께 <br/>
                실물 제작이 가능합니다!
              </div>
            </div>


          </div>
          <div>
            <NavLink to='/diary'>
              <div className={classes.btn}>
              다이어리 제작
              </div>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryExplain;
