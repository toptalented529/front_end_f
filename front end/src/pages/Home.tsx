import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar";
// import { links } from "../data";
import { Information } from "../components/Information";
// import { Quote } from "../components/Quote";
import { heading, paragraphText,experienceUrls, text } from "../data";
// import { Item } from "./pages/ItemDetail";
/* main app */
export default function Home(): JSX.Element {
  return (
    <div className="m-0 mx-auto w-full  bg-black ">
           <NavBar
            logo={text[3]}
      />
     <Hero bText={text[0]} hText={heading[0]} pText={paragraphText[3]} />
      <Information
        experienceUrls={experienceUrls}
        infoHeading={heading[1]}
        paragraph={paragraphText}
      />
      {/* <Quote author={text[2]} quote={text[1]} /> */}
      <Contact button={text[0]} h2={heading[2]} p={paragraphText[4]} />
      <Footer owner={text[4]} />
    </div>
  );
}
