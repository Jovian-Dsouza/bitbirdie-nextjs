import React from "react";
import SystemMesage from "@/components/SystemMessage";

function BrianAsk({ message_details }) {
  return (
    <SystemMesage title="Ask Brian" poweredBy="Brianknows.org">
      <p className="text-sm whitespace-pre-line">{message_details}</p>
    </SystemMesage>
  );
}

export default BrianAsk;
