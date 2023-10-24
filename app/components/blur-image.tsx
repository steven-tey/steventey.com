"use client";

import cx from "classnames";
import { useEffect, useState } from "react";
import Image from "next/image";

const BlurImage = (props: any) => {
  const [isLoading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]); // update the `src` value when the `prop.src` value changes
  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={cx(
        props.className,
        "duration-300 ease",
        isLoading
          ? "blur-sm" // to create the blur loading effect
          : "blur-none"
      )}
      onLoad={async () => {
        setLoading(false);
      }}
    />
  );
};

export default BlurImage;
