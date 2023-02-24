import { LazyLoadImage } from "react-lazy-load-image-component";

/**
 * @param {{ imgSrc: string | undefined; alt: string; pText: string | undefined; width: number height: number; }}
 */
export function InformationImage({
  card,
}: {
  card: {
    imgSrc: string | undefined;
    alt: string;
    pText: string | undefined;
    width: number;
    height: number;
  };
}): JSX.Element {

  const handleClick = () => {
    
  }
  return (
    <div className="border-4 border-blue-900 rounded-xl w-5/6 hover:cursor-pointer ">
      <LazyLoadImage
        alt={card.alt}
        height={"100%"}
        src={card.imgSrc}
        width={"100%"}
        onClick={handleClick}
      />
    </div>
  );
}
