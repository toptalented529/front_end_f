import { GenerateInformationCards } from "./GenerateInformationCards";
import { MainExperience } from "./MainExperience";
/**
 * @param {{ infoHeading: string; img: (string | undefined)[]; paragraph: (string | undefined)[]; }} props
 */
export function Information(props: {
  infoHeading: string;
  experienceUrls: (string | undefined)[];
  paragraph: (string | undefined)[];
}): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-6 pb-4 text-gray-900 sm:pb-8 bg-zinc-900">
      {/* <h1 className="p-12 text-4xl font-sans font-bold text-white text-center">
        {props.infoHeading}
      </h1> */}
      <MainExperience url ={props.experienceUrls} />
      <p className="text-white font-sans text-2xl">More experiences</p>
      <GenerateInformationCards props={props} />
    </div>
  );
}
