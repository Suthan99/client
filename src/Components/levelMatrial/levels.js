import "../CourseStyles.css";
import TripData from "../CourseData";
// import Trip1 from "../assets/contact.png";
// import Trip2 from "../assets/8.jpg";
// import Trip3 from "../assets/6.jpg";
import { useEffect, useState } from "react";
import { getAPI } from "../../service/api";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import DownloadButton from "../core/dowloadbtn";
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
function LevelMatrialCard() {
  const [AllDate, setAllDate] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { courseName, levelID } = useParams();
  const getAllCourse = () => {
    console.log(courseName, "courename");
    getAPI(`level/${levelID}`)
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
      <h1> {AllDate.levelName && AllDate.levelName}</h1>
      <div className="tripcard">
        {!Loading ? (
          AllDate &&
          !isEmptyObject(AllDate) && (
            <div>
              <div>
                {AllDate.levelMaterialTexts
                  ? AllDate.levelMaterialTexts
                  : "No reading texts "}
              </div>
              {AllDate.levelMaterialImage &&
              Array.isArray(AllDate.levelMaterialImage) &&
              AllDate.levelMaterialImage.length > 0 ? (
                AllDate.levelMaterialImage.map((item, i) =>
                  typeof item === "string" ? ( // Check if item is a base64-encoded string
                    <div className="p-5 m-1" key={i}>
                      <DownloadButton
                        base64String={item}
                        number={parseInt(i) + 1}
                        fileName={`testing${parseInt(i) + 1}`}
                      />
                    </div>
                  ) : null
                )
              ) : (
                <div>no files</div>
              )}
            </div>
          )
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

export default LevelMatrialCard;
