import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useParams } from "react-router-dom";
import classes from "./Magazine.module.css";

export default function Magazine() {
  const { id } = useParams();

  const [Magazine, setMagazine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await customAxios.get(`tip-magazine/${id}`);

      if (response.status === 200) {
        setMagazine(response.data.result[0]);
        // console.log(Magazine)
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className={classes.container}>
      <img src={Magazine.thumbnail} alt='이미지가 없습니다.' />
      <div className={classes.mainTitle}>{Magazine.title}</div>
      <div className={classes.intro}>{Magazine.intro}</div>
      <hr className={classes.hr} />

      {/* 내용 시작 */}
      <div>
        {/* sub1 */}
        <div className={classes.sub1}>
          <div className={classes.title}>{Magazine.subTitle1}</div>
          <img width={"100%"} src={Magazine.subImage1} />
          <div className={classes.content}>{Magazine.subContent1}</div>
        </div>

        <hr className={classes.hr} />

        <div className={classes.sub2}>
          <div className={classes.title}>{Magazine.subTitle2}</div>
          <img width={"100%"} src={Magazine.subImage2} />
          <div className={classes.content}>{Magazine.subContent2}</div>
        </div>

        <hr className={classes.hr} />

        <div className={classes.sub3}>
          <div className={classes.title}>{Magazine.subTitle3}</div>
          <img width={"100%"} src={Magazine.subImage3} />
          <div className={classes.content}>{Magazine.subContent3}</div>
        </div>

        <hr className={classes.hr} />

        <div className={classes.sub4}>
          <div className={classes.title}>{Magazine.subTitle4}</div>
          <img width={"100%"} src={Magazine.subImage4} />
          <div className={classes.content}>{Magazine.subContent4}</div>
        </div>
      </div>

      <hr className={classes.hr} />

      <div className={classes.outro}>{Magazine.outro}</div>
      <dir className={classes.bottom}></dir>
    </div>
  );
}
