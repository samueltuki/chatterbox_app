// Global state
import { useContext } from "react";
import { FirebaseContext } from "../../App";

// Anchor tags from urls in text
import Linkify from "react-linkify";

// Import react libraries
import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Assets
import bot from "../../images/bot.png";
import "./MessageBubble.css";
import { BsEmojiSmile, BsHandThumbsUp, BsHeart } from "react-icons/bs";

export default function MessageBubble({ message }) {
  // Usestates
  const textRef = useRef(null);
  const [showTab, setShowTab] = useState(false);
  const [counter, setCounter] = useState({ smile: "", heart: "", like: "" });
  const [icon, setIcon] = useState({ smile: false, heart: false, like: false });
  const { auth, firestore } = useContext(FirebaseContext);
  const { text, uid, photoURL, isBot } = message;
  const className = uid === auth.currentUser.uid ? "sent" : "received";
  // const ref = firestore.collection("messages").doc(message.id);

  async function deleteMessage(e) {
    if (uid === auth.currentUser.uid) {
      await firestore.collection("messages").doc(message.id).delete();
    }
  }

  // Mouse over for emoji

  const addReaction = (emoji) => {
    if (emoji === "🙂") {
      let num = +counter.smile;
      setCounter({ ...counter, smile: num + 1 });
      setIcon({ ...icon, smile: true });
    }

    if (emoji === "❤️") {
      let num = +counter.heart;
      setCounter({ ...counter, heart: num + 1 });
      setIcon({ ...icon, heart: true });
    }
    if (emoji === "👍") {
      let num = +counter.like;
      setCounter({ ...counter, like: num + 1 });
      setIcon({ ...icon, like: true });
    }
  };
  // async function handleEmoji({ onEmojiClick }) {
  //   await ref.update({});
  // }
  const handleMouseOver = () => {
    setShowTab(true);
  };

  const handleMouseOut = () => {
    setShowTab(false);
  };

  return (
    <motion.div
      className="message-box"
      ref={textRef}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`message ${className}`} >
        <img src={isBot ? bot : photoURL} alt="avatar" />

        <p onDoubleClick={deleteMessage}>
          <Linkify>{text}</Linkify>
          <span
            style={
              className === "sent"
                ? {
                    position: "absolute",
                    bottom: "-16px",
                    left: "100%",
                    transform: "translateX(-100%)",
                    display: "flex",
                  }
                : {
                    position: "absolute",
                    bottom: "-16px",
                    left: "0",
                    display: "flex",
                  }
            }
          ></span>
        </p>
      </div>
      {showTab && (
        <motion.div
          className="tab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tab-icons">
            <p className="fa fa-home">
              <div
                style={
                  className === "sent"
                    ? {
                        display: "flex",
                        justifyContent: "end",
                        marginRight: "45px",
                      }
                    : {
                        display: "flex",
                        marginLeft: "45px",
                      }
                }
              >
                <button
                  onClick={() => addReaction("🙂")}
                  className="reaction-button"
                >
                  <span>{counter.smile}</span>
                  {icon.smile ? "🙂" : <BsEmojiSmile />}
                </button>
                <button
                  onClick={() => addReaction("❤️")}
                  className="reaction-button"
                >
                  <span>{counter.heart}</span>
                  {icon.heart ? "❤️" : <BsHeart />}
                </button>
                <button
                  onClick={() => addReaction("👍")}
                  className="reaction-button"
                >
                  <span>{counter.like}</span>
                  {icon.like ? "👍" : <BsHandThumbsUp />}
                </button>
              </div>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
