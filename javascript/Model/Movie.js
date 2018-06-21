class Movie 
{
    constructor(slots)
    {
        this.title = slots.title;
        this.year = slots.year;
        this.genre = slots.genre;
        this.img = slots.img;
        this.summary = slots.summary;
        this.favorite = slots.favorite;
    }

    static CreateTestData() 
    {
        let testMovieOne = {title:"Jurassic Park", year:1993, genre:["Science-Fiction", " Adventure"], img:"Jurassic_Park.jpg", summary:"Dinos be trippin'", favorite:true};
        let testMovieTwo = {title:"Jaws", year:1975, genre:["Thriller"], img:"Jaws.jpg", summary:"Shark be trippin'", favorite:false};
        let testMovieThree = {title:"Godzilla", year:2014, genre:["Monster"], img:"Godzilla.jpg", summary:"Godzilla be trippin'", favorite: false};

        Movie.instances[1] = testMovieOne;
        Movie.instances[2] = testMovieTwo;
        Movie.instances[3] = testMovieThree;

        Movie.SaveAll();
    }

    static SaveAll()
    {
        var movieTableString="", error=false,
            nmbrOfMovies=Object.keys(Movie.instances).length;
        try 
        {
            movieTableString = JSON.stringify(Movie.instances);
            localStorage["movieTable"] = movieTableString;
        }
        catch(e)
        {
            alert("Error when writing to Local Storage\n" + e);
            error=true;
        }
        if(!error)
        {
            console.log(nmbrOfMovies + " movies saved.");
        }
    }
    /**
     * sdkjasofksjfxdklsmfj
     * @param {Object} movieRow 
     */
    static ConvertRow2Object(movieRow)
    {
        var movie = new Movie(movieRow);
        return movie;
    }

    static LoadAll()
    {
        let key="", keys=[], movieTableString="", movieTable={}; 
        try
        {
            if(localStorage["movieTable"])
            {
                movieTableString = localStorage["movieTable"];
            }
        }
        catch(e)
        {
            alert("Error when reading from Local Storage\n");
        }
        if(movieTableString)
        {
            movieTable = JSON.parse(movieTableString);
            keys = Object.keys(movieTable);
            console.log(keys.length +" movies loaded.");
            for(let i=0; i < keys.length; i++)
            {
                key = keys[i];
                Movie.instances[key] = Movie.ConvertRow2Object(movieTable[key]);
            }
        }
        else 
        {
            this.CreateTestData();
        }
    }

}
Movie.instances = {};