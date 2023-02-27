

export  function MainExperience(props:{url: (string | undefined)[] }):JSX.Element {


    return(
        <div className="w-full h-[70vh] justify-center self-center ">
            <iframe className="overflow-hidden" src= {props.url[0]}
             width={"100%"}
             height={"100%"} 
             tabIndex={-1}
             title ={"title"} 
             
             
             >
            </iframe>
        </div>
    )
}