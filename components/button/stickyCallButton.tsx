import React from "react";
import { Whatsapp } from "components/icons";

interface IStickCallButtonProps {
  settings: any;
}

const StickCallButton = ({ settings }: IStickCallButtonProps) => {
  const whatsappNumber = settings?.filter((filter: any) => filter.uniqueName === "whatsapp")[0].extensions[0];

  return (
    <a href={whatsappNumber?.key} target={"_blank"} className="c-button--sticky-call" rel="noreferrer">
      <Whatsapp color="white" />
    </a>
  );
};

export default StickCallButton;
