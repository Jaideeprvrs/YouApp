import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { AnimatedTextProps } from "../types/AnimatedTextProps";

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "",
  speed = 60,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const safeText = String(text);
    let index = 0;

    setDisplayedText("");

    if (!safeText.length) return;

    const id = setInterval(() => {
      index += 1;

      setDisplayedText(safeText.slice(0, index));

      if (index >= safeText.length) {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return <Text style={style}>{displayedText}</Text>;
};

export default AnimatedText;
