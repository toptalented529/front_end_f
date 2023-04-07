import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar/NavBar";
// import { links } from "../data";
import { Information } from "../components/Information";
// import { Quote } from "../components/Quote";
import { heading, paragraphText, experienceUrls, text } from "../data";
import { GetStarted } from "../components/landing/GetStarted";
import { Web3Space } from "../components/landing/Web3Space";
import { CreateSpace } from "../components/landing/Create";
// import { Item } from "./pages/ItemDetail";
/* main app */
export default function Home(): JSX.Element {
  return (
    <div className=" bg-black ">
      <NavBar logo={text[3]} />
      <Hero />
      <Information
        experienceUrls={experienceUrls}
        infoHeading={heading[1]}
        paragraph={paragraphText}
      />
      <GetStarted />
      <Web3Space />
      <CreateSpace />
      {/* <Quote author={text[2]} quote={text[1]} /> */}
      <Contact button={text[0]} h2={heading[2]} p={paragraphText[4]} />
      <Footer owner={text[4]} />
    </div>
  );
}
