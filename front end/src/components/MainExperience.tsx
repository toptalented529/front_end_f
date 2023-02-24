

export  function MainExperience(props:{url: (string | undefined)[] }):JSX.Element {


    return(
        <div className="w-4/5 h-[50vh] justify-center self-center ">
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