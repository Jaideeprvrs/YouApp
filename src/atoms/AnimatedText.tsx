import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";

interface AnimatedTextProps {
  text?: string; // can be undefined safely
  speed?: number; // ms per character
  style?: TextStyle;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "", // ✅ default to empty string
  speed = 60,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // always work with a safe string
    const safeText = String(text);
    let index = 0;

    setDisplayedText("");

    if (!safeText.length) return;

    const id = setInterval(() => {
      index += 1;

      // ✅ slice instead of indexing to avoid `undefined`
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
