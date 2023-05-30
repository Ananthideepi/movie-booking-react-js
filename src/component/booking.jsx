import React, { useState } from 'react'
let SCREENS = [
    {
        id: 1,
        time: "8:00AM",
        seats: [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1]
    },
    {
        id: 2,
        time: "12:00PM",
        seats: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0]
    },
    {
        id: 3,
        time: "3:00 PM",
        seats: [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]

    }, {
        id: 4,
        time: "6:00 PM",
        seats: [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
];
const MOVIES = [
    {
        id: 1,
        title: "Varisu",
        image: "https://images.news18.com/ibnlive/uploads/2022/08/vijay-2-1.jpg",
    },
    {
        id: 2,
        title: "Thunivu",
        image: "https://wallpapercave.com/wp/wp11525130.jpg",
    },
    {
        id: 3,
        title: "Ponniyin selvan2",
        image: "https://m.media-amazon.com/images/M/MV5BNjk0MGYzYTUtNTkzYy00ODZlLTkyOTktNDJhNGJkN2NmYzMzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    }
]

export default function Booking() {
    const [seletmovie, setSelectmovie] = useState(null);
    const [selectscreen, setSelectscreen] = useState(null);
    const [seletseat, setSelectseat] = useState([]);


    // console.log("seletmovie",seletmovie)
    // console.log("selectscreen", selectscreen)
    // console.log("seletseat",seletseat)
    // .............................select movie screen........................................................
    // const handlescreenselect = (index, movie) => {
    //     // console.log("index",index)
    //     // console.log("movie",movie)
    //     setSelectscreen([index])
    //     setSelectmovie(movie)
    //     // console.log("setSelectscreen", selectscreen)
    //     // console.log("setSelectmovie", seletmovie)
    // }
    //......................................select screen seat....................................................
    const handleseatselect = (index, screen) => {
        // console.log("screen",screen)
        // console.log("selectscreen",selectscreen)
        if (screen?.id !== selectscreen?.id) {
            setSelectseat([index])
            setSelectscreen(screen)
            return
        }
        setSelectscreen(screen)
        // ......................... remove seat select..............................
        // console.log("vvvvvvvvvv",seletseat.includes(index))
        if (seletseat.includes(index)) {
            // console.log("index",index)
            setSelectseat(seletseat.filter((i) => i !== index))
            if(seletseat.filter((i) => i !== index).length<1){
                setSelectscreen(null)
            }
        }
        else {
            setSelectseat((seletseat) => (
                // console.log("seatselect", seletseat),
                // ............push select seat..............................
                //   console.log("semmmats",[...seletseat,index]),
                [...seletseat, index]
            ))
        }
        // ..........................................................................................................
    }



    const booknow = () => {

        alert(`seats ${seletseat.map((item) => item + 1).join(",")} booked for ${selectscreen.movie.title} at ${selectscreen.time}`)
        SCREENS = SCREENS.map((screen) => {
            if (screen.id === selectscreen?.id) {
                let seats = screen.seats;
                console.log("screenseat", seats)
                seletseat.map((seat) => seats[seat] = 0);
                // console.log("seat",seat),
                // .......................index used too change or set the value 0......................

                return {
                    ...screen, seats
                }

            }
            return screen;
        })
        setSelectscreen(null)
        setSelectmovie(null)
        setSelectseat([])
    }
    return (
        <div className='container'>
            <h1>Movie Booking</h1>
            <h2>Choose Your Movies</h2>
            <div className='moiveList'>
                {
                    MOVIES.map((movie) => (
                        <div className='selected_movie' key={movie.id}>
                            <img src={movie.image} alt={movie.title}>
                            </img>
                            <button onClick={() => setSelectmovie(movie)}>{movie.title}</button>
                        </div>

                    ))
                }
            </div>
            <div className='screen_container'>
                {seletmovie && (

                    <div className='screenlist'>
                        <h2 >Select your screen</h2>
                        {SCREENS.map((screen, i) => (
                            //    console.log("screen",screen.id),
                            //    console.log("selectscreen?.id", selectscreen?.id),
                            <div className={`screen 
                                         ${screen?.id === selectscreen?.id ? "selected" : " "}
                                         ${screen.seats.includes(1) ? "avaliable" : ""} `}
                                key={screen.id}

                            >
                                <div className="screentop">
                                    <h3 className='screen_number'>Screen:{screen.id} </h3>
                                    <div className="screenright">
                                        <h4>Screen Time:{screen.time}</h4>
                                        <h4 className='movie_title'>Movie:<span style={{ textShadow: " rgb(201 185 185) 2px 2px", fontSize: "20px" }}>{seletmovie.title}</span></h4>
                                    </div>
                                    <div className="screenleft">
                                        <h6> <button style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: "rgb(39, 138, 214)" }}></button>Selected</h6>
                                        <h6> <button style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: "black" }}></button>Booked</h6>
                                        <h6> <button style={{ width: 15, height: 15, borderRadius: "50%", backgroundColor: " rgb(244, 244, 244)" }}></button>Available</h6>
                                    </div>
                                </div>

                                <div className='Screen_seat'>
                                    {screen.seats.map((seat, i) => (
                                        //  console.log("index",seat),
                                        <div key={i} className={`seat ${seat ? "avaliable" : "unavaliable"} 
                                                ${seletseat.includes(i) && screen.id === selectscreen.id ? "selected" : ""} 
                                                ${seletseat.includes(i) ? "booked" : ""}`}
                                            onClick={() => {
                                                if (seat) {
                                                    // console.log("index",i)
                                                    // console.log("seat selected", seat)
                                                    handleseatselect(i, { ...screen, movie: seletmovie })
                                                }

                                            }}>

                                            <div className='seatnumber'>{i + 1}</div>


                                        </div>
                                    ))
                                    }
                                </div>
                            </div>


                        ))

                        }

                    </div>)
                }
            </div>
            <div className='finalpart'>

                <div className='booking_details'>
                    <div className='selectedscreen'>
                        {
                            selectscreen && (
                                <div>
                                    <h3>Selected_Screen:{selectscreen.id}</h3>
                                    <p>Time:<span style={{ textShadow: " rgb(201 185 185) 2px 2px" ,fontWeight:"500"}}>{selectscreen.time}</span> </p>
                                    <p>Movie:<span style={{ textShadow: " rgb(201 185 185) 2px 2px" ,fontWeight:"500"}}>{selectscreen.movie.title}</span> </p>
                                </div>
                            )
                        }
                    </div>
                    <div className='selectedseat'>
                        {
                            selectscreen && seletseat?.length > 0 && (
                                <div>
                                    <p>Selected Seat_no:<span style={{ textShadow: " rgb(201 185 185) 2px 2px" ,fontWeight:"500"}}>{seletseat.map((item) => item + 1).join(",")}</span></p> 
                                    <p>Total seat:<span style={{ textShadow: " rgb(201 185 185) 2px 2px" ,fontWeight:"500"}}>{seletseat.length}</span></p>

                                </div>
                            )
                        }
                    </div>
                </div>

                <button className='button' onClick={booknow} disabled={!selectscreen || seletseat?.length === 0}> BOOK NOW</button>
            </div>

        </div>
    )
}
