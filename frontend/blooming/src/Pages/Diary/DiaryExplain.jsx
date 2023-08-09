import { useState, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import classes from './DiaryExplain.module.css';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

function DiaryExplain() {
  const navigate = useNavigate();
  const [originalBgColor, setOriginalBgColor] = useState(null);
  const [originalTextColor, setOriginalTextColor] = useState(null);

  gsap.registerPlugin(ScrollTrigger);

  const getColorStyles = () => {
    const bgColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
    const textColor = window.getComputedStyle(document.body).getPropertyValue('color');
    setOriginalBgColor(bgColor);
    setOriginalTextColor(textColor);
  };

  useEffect(() => {
    getColorStyles(); // 컬러 스타일을 가져옵니다

    const scroller = new LocomotiveScroll({
      el: document.querySelector('.container'),
      smooth: true,
    });

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
    }, [navigate, originalBgColor, originalTextColor]);

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

        <hr className={classes.hr} />

        {/* section 3 */}
        <section className={classes.section} data-bgcolor="#FFFAF4" data-textcolor="#666">
          <p data-scroll data-scroll-speed="1">
            설명 주절주절자리야
          </p>
          <NavLink to='/diary'>
            <button>
              다이어리 제작
            </button>
          </NavLink>
        </section>
      </div>
    </div>
  );
}

export default DiaryExplain;
