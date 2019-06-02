class Router {

    static loader ($page) {
        
        $("#container" ).load( "app/"+ $page +"/"+ $page +".html", ()=>{
            $.getScript("ressources/js/jquery-3.4.1.min.js", ()=>{
                $.getScript("ressources/js/popper.min.js", ()=>{
                        $.getScript("app/"+ $page +"/"+ $page +".js");

                });
            });
        });

    }

}

Router.loader("break");