import uuid from "react-uuid";
import { InformationImage } from "./InformationImage";
import churchImage from '../assets/images/Church_street.png'
import AliImage from '../assets/images/ali.png'
import UrbanImage from '../assets/images/urban.png'
/**
 * @param {{ infoHeading: string; img: (string | undefined)[]; paragraph: (string | undefined)[]; }}
 */
export function GenerateInformationCards({
  props,
}: {
  props: {
    infoHeading: string;
    experienceUrls: (string | undefined)[];
    paragraph: (string | undefined)[];
  };
}): JSX.Element {
  const informationCardsData = [
    {
      imgSrc: churchImage,
      alt: "image1",
      pText: props.paragraph[0],
      width: 770,
      height: 980,
      id:0
    },
    {
      imgSrc: UrbanImage,
      alt: "image2",
      pText: props.paragraph[1],
      width: 770,
      height: 980,
      id:1
    },
    {
      imgSrc: AliImage,
      alt: "image3",
      pText: props.paragraph[2],
      width: 770,
      height: 980,
      id:2
    },
  ];

  return (
    <div className="gap-16 mx-4 space-y-2 md:space-y-0 md:grid md:grid-cols-3  ">
      {informationCardsData.map((card) => (
        <div className="w-full hover:shadow-2xl" key={uuid()}>
          <InformationImage card={card} />
          {/* <p className="p-2">{card.pText}</p> */}
        </div>
      ))}
    </div>
  );
}
