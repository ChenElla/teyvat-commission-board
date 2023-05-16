import "bootstrap/dist/js/bootstrap.bundle.min.js";
import back_1 from '../../assets/background_image/background_venti.jpeg';
import back_2 from '../../assets/background_image/background_amber.jpeg';
import back_3 from '../../assets/background_image/background_mona.jpeg';
import back_4 from '../../assets/background_image/background_wanderer.jpeg';
import help_seeker_icon from '../../assets/icons/person-fill-exclamation.svg';
import helper_icon from '../../assets/icons/award.svg';
import multi_icon from '../../assets/icons/people.svg';
import './Landing.scss';
export default function Landing() {
  return (
        <div id="carouselExampleCaptions" className="carousel slide">
        
        <div className="carousel-inner">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-item active">
            <img src={back_1} className="d-block w-100" alt="..."/>
            <div className="carousel-caption">
                <h5>Empowering Gamers</h5>
                <p>Get Connected, Get Help, and Enjoy Gaming Like Never Before</p>
                <p><a href = "#about" className = "btn btn-warning mt-3">Learn More</a></p>
            </div>
            </div>
            <div className="carousel-item">
            <img src={back_2} className="d-block w-100" alt="..."/>
            <div className="carousel-caption">
                <h5>Unlock the Power of Gaming Community</h5>
                <p>Connect with Veterans for Multiplayer Assistance</p>
                <p><a href = "#about" className = "btn btn-warning mt-3">Learn More</a></p>
            </div>
            </div>
            <div className="carousel-item">
            <img src={back_3} className="d-block w-100" alt="..."/>
            <div className="carousel-caption">
                <h5>Find Your Gaming Ally</h5>
                <p>Discover Custom Multiplayer Content Tailored to Your Preferences</p>
                <p><a href = "#about" className = "btn btn-warning mt-3">Learn More</a></p>
            </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        

            
            <section id="about" className = "about section-padding">
                <div className = "container">
                    <div className = "row">
                        <div className="col-lg-4 col-md-12 col-12 mt-md-3">
                            <div className = "about-img">
                                <img src = {back_4} alt = "background_image4" className = "img-fluid"/>
                            </div>
                        </div>
                        <div className = "col-lg-8 col-md-12 col-12 ps-lg-5">
                            <div className = "about-text">
                                <h2>Post Commission Requests with Ease, <br/>Find Skilled Helpers in Real-Time</h2>
                                <p> Our platform is totally commission directed and simple to use. <br/>Need help? Post a request to the commission board. <br/>Want to offer help? Accept a request from the commission board. <br/>It's just THAT simple.<br/>
                                    Not limited to regular missions, we also encourage players to create custom multiplayer content tailored to ones' preferences.
                                    World farming, fishing trip, teapot showcase...tons of customizable multiplayer contents to enrich your gaming experience to the max!
                                </p> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className = "services">
                    <div className = "row">
                        <div className = "col-md-12">
                            <div className = "section-header text-center pb-5">
                                <h2>Our Target Users</h2>
                                <p>
                                    All Genshin Players - who LOVES multiplayer contents.
                                </p>
                            </div>
                        </div>
                    </div> 
                <div className = "container">
                    <div className = "row">
                        <div className = "col-12 col-md-12 col-lg-4">
                            <div className = "card text-white text-center bg-gradient pb-2 primary">
                                <div className = "card-body">
                                    <img className = "targetIcon" src = {help_seeker_icon} alt ="help_seeker"/>
                                    <h3 className = "card-title">
                                        Newbies (Help Seekers)
                                    </h3>
                                    <p className = "lead">
                                        If you ever struggle to find someone to help farm artifacts/materials, you found the right place! To request assistance, all you need is to complete a simple form specifying your request requirements and put it up! The system will notify you on any changes and you will soon be able to connect to the helpers through messages! 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className = "col-12 col-md-12 col-lg-4">
                            <div className = "card text-white text-center bg-gradient pb-2 primary">
                                <div className = "card-body">
                                    <img className = "targetIcon" src = {helper_icon} alt ="helper"/>
                                    <h3 className = "card-title">
                                        Veterans (Helpers)
                                    </h3>
                                    <p className = "lead">
                                        Ever bored because of few fresh in-game contents? Wanna offer help to newbies but do not know where to find them? If any thought like that rings the bell, this is the perfect place where you can showcase your strongly built characters, your experience as veterans while offering help to other players. So what are you still waiting for??
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className = "col-12 col-md-12 col-lg-4">
                            <div className = "card text-white text-center bg-gradient pb-2 primary">
                                <div className = "card-body">
                                    <img className = "targetIcon" src = {multi_icon} alt ="multiplayers"/>
                                    <h3 className = "card-title">
                                        Custom Multiplayer Content Creaters/Lovers
                                    </h3>
                                    <p className = "lead">
                                        Looking for some gaming ally to DIY and play fun multiplayer contents? Not only limited to world farming, fishing trip, teapot showcase or any playmode that currently exists in game, we support requests of any customizable multiplayer contents! Why not give it a try today?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            <section id="contact" className = "contact section-padding">
                <div className = "row">
                        <div className = "col-md-12">
                            <div className = "section-header text-center pb-5">
                                <h2>Contact Us</h2>
                                <p><br/>Have any questions?</p>
                            </div>
                        </div>
                </div>
                <div className = "container">
                    <div className="row m-0">
                        <div className = "col-md-12 p-0 pt-4 pb-4">
                            <form action = "#" className = "secondary p-4 m-auto">
                            <div className = "row">
                                <div className = "col-md-12">
                                    <div className= "mb-3">
                                        <input type="text" className = "form-control" required placeholder = "Your Full Name"/>
                                    </div>
                                </div>
                                <div className = "col-md-12">
                                    <div className = "mb-3">
                                        <input type = "email" className = "form-control" required placeholder = "Your Email Here"/>
                                    </div>
                                </div>
                                <div className = "col-md-12">
                                    <div className = "mb-3">
                                        <textarea  rows = "3" required className = "form-control" placeholder = "Your Query Here"/>
                                    </div>
                                </div>
                                <button className = "btn btn-warning btn-lg btn-block mt-3">Send Now</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}
