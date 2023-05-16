import icon from "../../assets/logo/Tecobo_round.png";
import './Loading.scss';
export default function Loading() {
  return (
    <div className= "loading">
        <img className = "loading__icon rotating" src = {icon} alt ="TeCoBo_logo"/>
        <div className = "loading__text">
            LOADING...
        </div>
    </div>
  )
}
