import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import { API_URL, PRIVILEGED_CHANNELS } from "../../config";
import { addMessage } from "../ChatView/actions";
import { changeColor } from "../../containers/StyleProvider/actions";
import { changePreWinner, changePrize } from "../GiveawayRules/actions";
import { changeAnimationDuration } from "../RaffleWrapper/actions";
import { pushUser } from "../UserList/actions";
import ChatView from "../ChatView";
import GiveawayRules from "../GiveawayRules";
import UserList from "../UserList";
import SuperChat from "./SuperChat";
import db from "./db";

const ThreeSections = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: row;
  height: 95vh;
  @media (orientation: portrait) {
    flex-direction: column;
    height: auto;
  }
`;

const YoutubeWorker = (props) => {
  const dispatch = useDispatch();
  const [superChat, setSuperChat] = useState(null);

  const checkPreWinner = (author) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const data = {
      channelId: author.id,
      displayName: author.title,
      message: author.message,
      videoId: props.videoId,
      platform: props.platform,
    };
    axios
      .post(`${API_URL}/v4/bwin`, qs.stringify(data), config)
      .then((res) => {
        if (res.data && res.data.bwin && res.data.bwin === "yes") {
          dispatch(changePreWinner(author));
          db.messages
            .filter(
              (message) =>
                message.authorId === author.id &&
                message.displayText === author.message,
            )
            .delete();
        }
      })
      .catch(() => {});
  };

  const superChatFeatures = (author, chatMessage) => {
    if (PRIVILEGED_CHANNELS.includes(author.id) || chatMessage.isOwner) {
      if (author.message.startsWith("!s ")) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: author.message.replace("!s ", ""),
        });
        setTimeout(() => setSuperChat(null), 6000 + author.message.length * 30);
      } else if (author.message.startsWith("!color ")) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed color to ${author.message.replace(
            "!color ",
            "",
          )}`,
        });
        dispatch(changeColor(author.message.replace("!color ", "")));
        setTimeout(() => setSuperChat(null), 10000);
      } else if (author.message.startsWith("!time ")) {
        const seconds = Number(author.message.replace("!time ", ""));
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed animation duration to ${seconds}`,
        });
        setTimeout(() => setSuperChat(null), 10000);
        if (!Number.isNaN(seconds) && seconds > 0 && seconds < 601) {
          dispatch(changeAnimationDuration(seconds));
        }
      } else if (author.message.startsWith("!prize ")) {
        setSuperChat({
          title: author.title,
          imageUrl: author.imageUrl,
          message: `${author.title} changed prize to ${author.message.replace(
            "!prize ",
            "",
          )}`,
        });
        dispatch(changePrize(author.message.replace("!prize ", "")));
        setTimeout(() => setSuperChat(null), 10000);
      }
      checkPreWinner(author);
    }
  };

  const checkResignation = (author) => {
    if (
      localStorage.getItem("gv-abortCommand") !== null &&
      author.message === localStorage.getItem("gv-abortCommand")
    ) {
      db.table("users").where("id").equals(author.id).modify({
        isEligible: false,
      });
    }
  };
  const platform = props.platform || "kick";
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/chat");

    ws.onopen = () => {
      console.log(props.videoId);
      console.log(props.platform);
      ws.send(
        JSON.stringify({
          channel: props.videoId,
          platform: props.platform,
        }),
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Przyszła wiadomość z backendu:", data);
      const dbMessage = {
        authorId: data.author,
        displayText: data.message,
        publishedAt: new Date().toISOString(),
      };

      const chatViewMessage = {
        imageUrl: "",
        isModerator: data.is_moderator,
        isOwner: data.is_streamer,
        isSponsor: data.subscriber > 0,
        isVerified: data.is_vip,
        title: data.author,
        ...dbMessage,
      };

      dispatch(addMessage(chatViewMessage));

      if (!(
        dbMessage.displayText === localStorage.getItem("keyword") &&
        localStorage.getItem("gv-saveCommands") !== "true"
      )) {
        db.table("messages").add(dbMessage);
      }

      const userListAuthor = {
        id: data.author,
        imageUrl: "",
        title: data.author,
        message: data.message,
        isModerator: data.is_moderator,
        isSponsor: data.subscriber > 0,
        isVerified: data.is_vip,
        isEligible: data.message
          .toLowerCase()
          .includes((localStorage.getItem("keyword") || "").toLowerCase()),
      };

      dispatch(pushUser(userListAuthor));
      checkResignation(userListAuthor);
      superChatFeatures(userListAuthor, chatViewMessage);
    };

    return () => {
      ws.close();
    };
  }, [props.videoId, props.platform]);

  return (
    <ThreeSections>
      <UserList />
      <GiveawayRules apiKey={props.apiKey} />
      <ChatView videoId={props.videoId} />
      {superChat && (
        <SuperChat
          imageUrl={superChat.imageUrl}
          message={superChat.message}
          title={superChat.title}
        />
      )}
    </ThreeSections>
  );
};

YoutubeWorker.propTypes = {
  apiKey: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  platform: PropTypes.string,
};

export default YoutubeWorker;
