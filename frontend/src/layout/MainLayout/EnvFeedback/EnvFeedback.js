import React from "react";
import { useHandleShow } from "./useHandleShow";

import './styles.css'

export const EnvFeedback = ({ nodeEnv }) => {
  const { isHide, handleEnvHide } = useHandleShow();
  return (
    <div
      className={`env-container ${isHide ? "hide" : ""}`}
      onMouseOver={() => {
        handleEnvHide(false);
      }}
      onMouseLeave={() => handleEnvHide(true)}
      onClick={() => handleEnvHide(false)}
    >
      <span className="material-symbols-outlined env-icon">lab_panel</span>
      {nodeEnv}
    </div>
  );
};
