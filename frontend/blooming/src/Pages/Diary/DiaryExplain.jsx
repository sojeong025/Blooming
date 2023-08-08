import { useState, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import classes from './DiaryExplain.module.css';
import { useNavigate } from 'react-router-dom';



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
        <section data-bgcolor="#bcb8ad" data-textcolor="#032f35">
          <div>
            <p className={classes.mainText} data-scroll data-scroll-speed="3">
              메시지와 함께 전하는 <br /> <span>소중한 한 장의 기억</span>
            </p>
            <p>
              시간을 되돌릴 순 없지만 <br />추억은 언제든 다시 마주할 수 있어요
            </p>
          </div>
          <img className={classes.mainImg1} src="/src/assets/diary.jpg" alt="" />
        </section>

        {/* section 2 */}
        <section data-bgcolor="#eacbd1" data-textcolor="#536fae">
          <img className={classes.mainImg2} src="/src/assets/diary2.jpg" alt="" />
          <div>
          <p data-scroll data-scroll-speed="1">
            매일 매일이 소중한 순간이 되도록, 기록해보세요</p>
          <p>각자의 마음을 펼쳐 적어나가며 더욱 가까워질 수 있는 기회입니다</p>
          </div>
        </section>

        {/* section 3 */}
        <section data-bgcolor="#536fae" data-textcolor="#eacbd1">
          <img src="https://images.pexels.com/photos/5604966/pexels-photo-5604966.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          <p data-scroll data-scroll-speed="1">
          마음을 열어 이제까지의 느낌과 기억을 써내려가는 페이지입니다<br />결혼식 날, 우리의 이야기를 다시 읽으면서 감동을 느껴보세요
          </p>
        </section>

        {/* section 4 */}
        <section data-bgcolor="#e3857a" data-textcolor="#f1dba7">
          <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          <p data-scroll data-scroll-speed="1">
          마지막 페이지에는 결혼식 날의 감동을 적어보세요<br/>이전 페이지들과 함께 읽으면서 그때의 감정을 다시 느껴볼 수 있을 것입니다
          </p>
        </section>
      </div>
    </div>
  );
}

export default DiaryExplain;
