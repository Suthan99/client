import "../CourseStyles.css";
import TripData from "../CourseData";
// import Trip1 from "../assets/contact.png";
// import Trip2 from "../assets/8.jpg";
// import Trip3 from "../assets/6.jpg";
import { useEffect, useState } from "react";
import { getAPI } from "../../service/api";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

function LevelCard() {
  const [AllDate, setAllDate] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { courseName, courseID } = useParams();
  const getAllCourse = () => {
    console.log(courseName, "courename");
    getAPI(`level/course/${courseID}`)
      .then((resp) => {
        let sample = [];
        sample = resp.data;
        console.log(sample, "-----------");
        setAllDate(sample);
        setLoading(false);
      })
      .catch((err) => {
        setAllDate([]);
      });
  };
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <div className="trip">
      <h1> {courseName && courseName}</h1>
      <div className="tripcard">
        {!Loading ? (
          AllDate &&
          AllDate.map((level, i) => (
            <TripData
              id={level._id}
              image={`data:image/png;base64,${level.levelImage}`}
              materialImage={level.levelMaterialImage}
              // image={level.levelImage}
              heading={level.levelName}
              text={level.levelDescription}
              type="level"
              number={parseInt(i) + 1}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
       
      </div>
    </div>
  );
}

export default LevelCard;
