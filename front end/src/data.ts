const paragraphText = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eos ea nostrum, quas molestias autem veniam natus deserunt et obcaecati commodi eveniet illum aliquid quo, voluptate est ipsum idperferendis?",
  "Lorem ipsum dolor sit amet consectetur adipisicing. Culpa, soluta molestiae nihil nam, at ea dolore debitis maxime aliquam adipisci, illum amet pariatur corrupti ipsam delectus repellat quod repudiandae minus?",
  "Lorem ipsum dolor sit amet consectetur. Tempora, nihil quo. Aliquam excepturi quaerat exercitationem reprehenderit, maxime saepe! Nostrum repudiandae, amet culpa iusto recusandae aliquid. Dolor iure saepe nobis fugit.",
  "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Sign up for more lorem ipsum",
];

const links = ["link 1", "link 2", "link 3"] as const;

const heading = [
  "Project",
  "Experiences",
  "join us! lorem ipsum",
] as const;

const text = [
  "Click to start",
  "Nihil et nobis aperiam natus quod quos quisquam quasi earum possimus amet obcaecati excepturi, ratione reprehenderit! Rem, in!",
  "anonymous",
  "Arabic for Space",
  "Fada",
] as const;

const experienceUrls = [
  "https://xr.gmetri.com/al_fahidi",
  "https://xr.gmetri.com/urbanitarian",
  "https://luru.gmetri.com/luru",
];

/////////////////////this is general experience urls/////////////////////////


const experiences = [
  "https://luru.gmetri.com/luru",
  "https://xr.gmetri.com/urbanitarian",
  "https://xr.gmetri.com/al_fahidi"
]


//////////////////////////this is for edit experience URLs///////////////////
const items = [
  {
    imageId: [
      "1676312738829","1675879026781"
    ]
    ,
  urls:"https://novdyn.gmetri.com/the_cozy_den_4",
  uuid:"73aa558c-de61-4e01-9b76-e3c200bbbefe"
  },
  {
    imageId: [
      "1","2","3","4"
    ]
    ,
  urls:"https://novdyn.gmetri.com/katashi_1",
  uuid:"6d32143c-5d43-437e-b863-7e2efc7d69da"
  },
  {
    imageId: [
      "1","2"
    ]
    ,
  urls:"https://novdyn.gmetri.com/the_cozy_den_3",
  uuid:"73aa558c-de61-4e01-9b76-e3c200bbbefe"
  }
]

export { paragraphText, links, heading, text, experienceUrls,experiences, items };
