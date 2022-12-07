import React, { useState } from "react";
import EyeOpenIcon from "@material-ui/icons/VisibilityOutlined";
import EyeCloseIcon from "@material-ui/icons/VisibilityOffOutlined";

const ShowHidePassword = () => {
  const [visible, setVisible] = useState(false);

  const Icon = (
    <i>
      {visible ? (
        <EyeCloseIcon onClick={() => setVisible((visiblity) => !visiblity)} />
      ) : (
        <EyeOpenIcon onClick={() => setVisible((visiblity) => !visiblity)} />
      )}
    </i>
  );
  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default ShowHidePassword;
