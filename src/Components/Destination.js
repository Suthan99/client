import Mountain1 from "../assets/1.jpg";
import Mountain2 from "../assets/2.jpg";
import Mountain3 from "../assets/3.jpg";
import Mountain4 from "../assets/4.jpg";

import DestinationData from "./DestinationData";
import "./DestinationStyles.css"
const Destination = () => {
    return (
        <div className="destination">
            <h1>Learn the way you want </h1>
            <p>Speaking, Writing, Reading and Listening are the four main components in the language learning</p>

            <DestinationData 
            className="first-des"
            heading="1. Online Course"
            text="You can progress through the language course systematically, advancing level by level. Each level grants access to specific learning materials, which you are expected to study thoroughly. Following the completion of the learning material for a particular level, you will be required to undertake a quiz to assess your understanding. This structured approach enables you to develop your language skills gradually and comprehensively, level by level."
            
            img1={Mountain1}
            img2={Mountain2}

          
            />
             <DestinationData

            className="first-des-reverse"
            heading="2. Live Online Language Classes"
            text="For the live class, you have the option to participate in either group sessions or individual sessions. During these sessions, the instructor will provide guidance and instruction aimed at enhancing your language skills."
            
            img1={Mountain3}
            img2={Mountain4}

          
            />

        </div>
    )
}

export default Destination