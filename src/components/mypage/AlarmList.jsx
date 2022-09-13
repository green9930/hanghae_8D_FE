import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "api/cookies";

const AlarmList = () => {
  const alarmList = [
    {
      alarmId: 1,
      title: "게시글 제목 타이틀",
      createdAt: "1분전",
      type: "comment",
    },
    {
      alarmId: 2,
      title: "게시글 제목 타이틀",
      createdAt: "12분전",
      type: "content",
    },
    {
      alarmId: 3,
      title: "게시글 제목 타이틀",
      createdAt: "30분전",
      type: "comment",
    },
    {
      alarmId: 4,
      title: "게시글 제목 타이틀",
      createdAt: "35분전",
      type: "comment",
    },
    {
      alarmId: 5,
      title: "게시글 제목 타이틀",
      createdAt: "48분전",
      type: "content",
    },
    {
      alarmId: 6,
      title: "게시글 제목 타이틀",
      createdAt: "1시간전",
      type: "comment",
    },
    {
      alarmId: 7,
      title: "게시글 제목 타이틀",
      createdAt: "1시간 20분전",
      type: "comment",
    },
    {
      alarmId: 8,
      title: "게시글 제목 타이틀",
      createdAt: "2시간 1분전",
      type: "comment",
    },
    {
      alarmId: 9,
      title: "게시글 제목 타이틀",
      createdAt: "4시간 18분전",
      type: "content",
    },
    {
      alarmId: 10,
      title: "게시글 제목 타이틀",
      createdAt: "5시간전",
      type: "content",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/api/notifications`,
          headers: {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Authorization: getCookie("accessToken"),
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <StAlarmList>
      {alarmList.map((val) => (
        <li key={val.alarmId}>
          <AlarmCard alarmItem={val} />
        </li>
      ))}
    </StAlarmList>
  );
};

const StAlarmList = styled.ul`
  padding: 0 35px;
`;

export default AlarmList;
