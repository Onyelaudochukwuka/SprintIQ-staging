import * as React from "react";
import { twMerge } from "tailwind-merge";

type ICreatorIn = React.SVGAttributes<SVGElement>;

const CreatorIn: React.FC<ICreatorIn> = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      width="109"
      height="101"
      viewBox="0 0 109 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("fill-current", className)}
    >
      <circle cx="50.5" cy="26.5" r="26.5" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M97.398 87.7359C97.1022 83.881 95.9519 80.0693 93.9707 76.4566C91.6453 72.2162 88.2141 68.3226 83.8389 65.0179C79.4633 61.713 74.2418 59.0718 68.4633 57.2639C62.6854 55.4562 56.4805 54.5225 50.2062 54.5225C43.932 54.5225 37.7271 55.4562 31.9492 57.2639C26.1706 59.0718 20.9491 61.713 16.5736 65.0179C12.1984 68.3226 8.76716 72.2162 6.44174 76.4566C4.46054 80.0693 3.31027 83.881 3.01447 87.7359L50.2062 87.7359H97.398ZM99.4035 87.7359C99.104 83.5325 97.862 79.3929 95.7243 75.4949C93.2484 70.98 89.6193 66.8776 85.0443 63.422C80.4693 59.9664 75.038 57.2253 69.0605 55.3552C63.0829 53.485 56.6763 52.5225 50.2062 52.5225C43.7362 52.5225 37.3295 53.485 31.352 55.3552C25.3745 57.2253 19.9432 59.9664 15.3682 63.422C10.7932 66.8776 7.1641 70.98 4.68813 75.4949C2.55049 79.3929 1.30851 83.5325 1.00899 87.7359C0.961586 88.4012 0.93779 89.0681 0.93779 89.7359H2.93779L50.2062 89.7359H97.4747H99.4747C99.4747 89.0681 99.4509 88.4012 99.4035 87.7359Z"
      />
      <path
        d="M98.381 83.4211V73H91.4286V83.4211H81V90.3684H91.4286V100.789H98.381V90.3684H108.81V83.4211H98.381Z"
        fill="#1FC04D"
      />
    </svg>
  );
};
export default CreatorIn;
