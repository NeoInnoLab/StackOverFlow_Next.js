import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}
const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      <div className="relative w-[16px] h-[16px]">
        <Image
          src={imgUrl}
          alt={alt}
          fill={true}
          objectFit="cover"
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
      </div>
      <p className={`${textStyles} gap-1 flex items-center ml-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap">{metricContent}</div>;
};

export default Metric;
