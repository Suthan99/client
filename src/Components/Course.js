import "./CourseStyles.css";
import Trip2 from "../assets/w3.jpeg";
import { useEffect, useState } from "react";
import { getAPI } from "../service/api";
import { CircularProgress } from "@mui/material";
import HalDetailsCard from "./HalDetails";

function Trip({onAddToCart}) {
  const [AllDate, setAllDate] = useState([]);
  const [Loading, setLoading] = useState(true);
  const getAllCourse = () => {
    getAPI("product")
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
  const redirectPage = () => {};
 
  return (
    <div className="trip">
      <h1> Total Product</h1>
      <div className="tripcard">
        {!Loading ? (
          AllDate &&
          AllDate.map((course, i) => (
            <HalDetailsCard
              alldata={course}
              image={course.image ? course.image:Trip2}
              redirectPage={redirectPage}
              onAddToCart={onAddToCart}
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

export default Trip;
