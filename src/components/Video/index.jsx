import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Video({ section, entry, transcoderJobStatus, jobStatus, src, ...rest }) {
  let videoJobId;
  let videoSectionId;
  let [currentJobStatus, setCurrentJobStatus] = useState(null);
  const videoRef = useRef();
  const [error, setError] = useState(false);
  const [isSkildVideoValidUrl, setIsSkildVideoValidUrl] = useState(false);
  const [SkildVideoJobId, setSkildVideoJobId] = useState(null);
  const [inProgress, setInProgress] = useState(true);
  const [isVideoUploaded, setIsVideoUploaded] = useState(true);
  const [isCounterAbove20, setIsCounterAbove20] = useState(true);
  let countVideoLoad = 0;

  useEffect(() => {
    if (entry) {
      if (entry.planList) {
        videoJobId = entry.planList[0].contentList.find((jobId) => {
          return jobId.sectionId === section.sectionId;
        });

        videoSectionId = videoJobId?.sectionId;
        setCurrentJobStatus(videoJobId?.jobStatus);

        if (videoJobId) {
          setSkildVideoJobId(videoJobId?.jobId);
        }
      }
    }
  }, [entry, currentJobStatus, jobStatus])

  useEffect(() => {
    if (currentJobStatus) {
      if (currentJobStatus === "Progressing") {
        if (section.sectionId === videoSectionId) {
          setIsSkildVideoValidUrl(false);
          setInProgress(true);
          if (jobStatus === null) {
            const interval = setInterval(() => {
              transcoderJobStatus(SkildVideoJobId)
            }, 5000);
            return () => clearInterval(interval);
          } else if (jobStatus !== null) {
            const interval = setInterval(() => {
              if (jobStatus?.jobStatus === 'Progressing') {
                transcoderJobStatus(SkildVideoJobId)
              } else if (jobStatus?.jobStatus === "Complete") {
                setIsSkildVideoValidUrl(false);
                setInProgress(false);
              }
              else if (jobStatus?.jobStatus === 'Error' || jobStatus?.jobStatus === 'Canceled') {
                setIsSkildVideoValidUrl(true);
              }
            }, 5000);
            return () => clearInterval(interval);
          }

        }
      }
      else if (currentJobStatus === "Complete") {
        setIsSkildVideoValidUrl(false);
        setInProgress(false);
      }
      else if (currentJobStatus === 'Error' || currentJobStatus === 'Canceled') {
        setIsSkildVideoValidUrl(true);
      }
    }
  }, [currentJobStatus, jobStatus, isSkildVideoValidUrl, inProgress, SkildVideoJobId, isVideoUploaded])

  useEffect(() => {
    if (currentJobStatus === null) {
      const interval = setInterval(() => {
        if (section.sectionId === videoSectionId) {
          setInProgress(false)
        }
        if (!error) {
          clearInterval(interval);
        } else {
          // If the video is not loaded yet then change the url to fetch again
          if (videoRef.current) {
            videoRef.current.load();
          }
          if (error && countVideoLoad >= 4) {
            setIsCounterAbove20(false);
            setIsSkildVideoValidUrl(true);
          }
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [error, inProgress, currentJobStatus]);




  const handleError = () => {
    setError(true);
    countVideoLoad = countVideoLoad + 1;
  };

  const handleCanPlay = () => {
    setError(false);
  };
  // ================================================ 
  return (
    <>
      {!isSkildVideoValidUrl ?
        <div>
          {!inProgress && (< video
            onCanPlay={handleCanPlay}
            onError={handleError}
            ref={videoRef}
            {...rest}
            width="100%"
            controls
            muted={false}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support HTML video.
          </video >)}
          {inProgress && (
            <div>
              <Grid style={{
                display: "flex",
                justifyContent: "center",
              }} item sm={12}>
                <CircularProgress style={{ color: 'grey' }} />
              </Grid>
              <br />
              <Typography style={{ color: 'red', textAlign: 'center', font: 24 }}>
                <em><b>Your video is processing. Please wait...</b></em>
              </Typography>
            </div>
          )
          }
        </div > : <Typography style={{ color: '#e91c0d' }}>An error occurred. Please check the file you uploaded.</Typography>}
    </>
  );
}
