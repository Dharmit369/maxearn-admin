import { Button, Typography } from "antd";
import React from "react";

interface LabelProps {
  label: string;
  className?: string;
  onPress?: () => void;
}

export const LabelComponent: React.FC<LabelProps> = ({
  label,
  className,
  onPress,
  ...props
}) => {
  return (
    <div>
      <text className={className} {...props} onClick={onPress}>
        {label}
      </text>
    </div>
  );
};
