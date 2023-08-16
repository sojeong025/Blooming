import { useState, useEffect } from "react";
import { customAxios } from "../../lib/axios";
import classes from "./WeddingFair.module.css";
import { Modal } from "antd";

function WeddingFair() {
  const [weddingFairData, setWeddingFairData] = useState([]);
  // const weddingFairData = [
  //   {
  //     thumbnail:
  //       "https://i0.wp.com/ad.cpaad.co.kr/data/ad/202304/42635e34d702a842a5408bf099b3a49d_a3Xqb2NfxxTKUZO2OgnvPw.jpg?ssl=1",
  //     name: "부산 KNN 웨딩박람회",
  //     datetime: "2023.08.19(토)~2023.08.20(일)",
  //     place: "KNN센텀 신사옥 1층",
  //     link: "https://ad.cpaad.co.kr/wwedding02/dlxornjs0512",
  //   },
  //   {
  //     thumbnail:
  //       "https://i0.wp.com/ad.cpaad.co.kr/data/ad/202307/42635e34d702a842a5408bf099b3a49d_fUZ7UlVyP3lGtHmS2.jpg?ssl=1",
  //     name: "부산 K-TOP 웨딩박람회",
  //     datetime: "2023.08.19(토)~2023.08.20(일)",
  //     place: "부산 센텀시티 신세계백화점 9층",
  //     link: "https://ad.cpaad.co.kr/banhana01/dlxornjs0512",
  //   },
  //   {
  //     thumbnail:
  //       "https://i0.wp.com/ad.cpaad.co.kr/data/ad/202307/42635e34d702a842a5408bf099b3a49d_61Gl9BMLPzPRIJEUivsA6LggPD.jpg?ssl=1",
  //     name: "부산 벡스코 웨딩박람회",
  //     datetime: "2023.08.25(금)~2023.08.27(일)",
  //     place: "벡스코 제 2전시장 1층",
  //     link: "https://ad.cpaad.co.kr/bwc02/dlxornjs0512",
  //   },
  //   {
  //     thumbnail:
  //       "https://i0.wp.com/ad.cpaad.co.kr/data/ad/202307/42635e34d702a842a5408bf099b3a49d_NLqHiTRWbOWI8fFt8186.jpg?ssl=1",
  //     name: "부산 K-TOP 허니문박람회",
  //     datetime: "2023.08.19(토)~2023.08.20(일)",
  //     place: "신세계백화점 센텀시티점 9층",
  //     link: "https://ad.cpaad.co.kr/banhanaH01/dlxornjs0512",
  //   },
  //   {
  //     thumbnail:
  //       "https://i0.wp.com/ad.cpaad.co.kr/data/ad/202307/42635e34d702a842a5408bf099b3a49d_bDZYGj7LFZ.jpg?ssl=1",
  //     name: "부산 결혼예물 초대전",
  //     datetime: "2023.08.19(토)~2023.08.20(일)",
  //     place: "센텀시티 신세계백화점 9층",
  //     link: "https://ad.cpaad.co.kr/banhanaJJ01/dlxornjs0512",
  //   },
  // ];

  const fetchData = async () => {
    try {
      const response = await customAxios.get("wedding-fair");

      if (response.status === 200) {
        console.log(response);
        setWeddingFairData(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleCardClick = (link) => {
  //   window.open(link, "_blank");
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleCardClick = (link) => {
    setModalContent(link);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (isModalOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.container}>
      {weddingFairData.map((item, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(item.link)}
          className={classes.card}
        >
          <div>
            <img src={item.thumbnail} alt={item.name} className={classes.img} />
          </div>
          <div className={classes.cardtext}>
            <div className={classes.cardtitle}>{item.name}</div>
            <div className={classes.carddate}>{item.datetime}</div>
            <div className={classes.cardplace}>{item.place}</div>
          </div>
        </div>
      ))}

      <Modal
        title='웨딩박람회 정보'
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        style={{
          top: 5,
          margin: "auto",
          width: "95vw",
          padding: 0,
        }}
      >
        <iframe
          src={modalContent}
          style={{ width: "100%", height: "90vh", border: "none" }}
          title='웨딩박람회 정보'
        />
      </Modal>
    </div>
  );
}

export default WeddingFair;
