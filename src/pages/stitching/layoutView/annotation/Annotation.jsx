/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from "react";
import ReactImageAnnotate from "react-image-annotate";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { appState } from "../LayoutStore";
import { LayoutStore } from "../LayoutStore";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "25px",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 0,
    },
    tool: {
      marginTop: "20px",
    },
    heading: {
      color: "#0e4a7b",
    },
    imgBox: {
      marginTop: "30px",
    },
  })
);

export const AnnotationPage = observer((props) => {
  console.log(props);
  const history = useHistory();
  const classes = useStyles();
  const coordinates = (data, width, height) => {
    const array = [];
    data.map((obj) => {
      if (obj.type === "box") {
        array.push({
          x: Math.floor(obj.x * width),
          y: Math.floor(obj.y * height),
          w: Math.floor(obj.w * width),
          h: Math.floor(obj.h * height),
          feedId: obj.tags ? obj.tags[0] : "",
          type: obj.type,
          designatedAreaId: obj.cls,
          cameraId: props.id,
          machineId: props.machineId,
        });
      } else {
        const points = [];
        obj.points.map((point) => {
          points.push(
            Math.floor(point[0] * width),
            Math.floor(point[1] * height)
          );
        });
        array.push({
          x: points[0],
          y: points[1],
          w: Math.floor(0 * width),
          h: Math.floor(0 * height),
          points,
          type: obj.type,
          feedId: obj.tags ? obj.tags[0] : "",
          designatedAreaId: obj.cls,
          cameraId: props.id,
          machineId: props.machineId,
        });
      }
    });
    const body = {
      data: array,
    };
    console.log(body);
    props.store.saveAnnotation(body, history);
  };
  // const getFeedTag = (tagId) => {
  //     let FeedTag = '';
  //     FeedTag = JSON.parse(localStorage.getItem("feedTag")).filter(id => {
  //         return id === tagId

  //     })[0]
  //     return FeedTag == undefined ? '' : FeedTag
  // }

  // const getWorkerTag = (tagId) => {
  //     let workerTag = '';
  //     workerTag = JSON.parse(localStorage.getItem("DesignatedTag")).filter(id => {
  //         return id === tagId

  //     })[0]
  //     return workerTag == undefined ? '' : workerTag
  // }
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <h1
            className={classes.heading}
            style={{ cursor: "pointer" }}
            onClick={() => history.goBack()}
          >
            <span>
              <i
                class="fa fa-arrow-left"
                aria-hidden="true"
                style={{ marginRight: "8px" }}
              ></i>
            </span>
            Zone
          </h1>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}> view</Paper>
        </Grid>
        <Grid item xs={12} sm={1}>
          <Paper className={classes.paper}>Floor</Paper>
        </Grid>
        <Grid item xs={6} sm={1}>
          <Paper className={classes.paper}>
            {" "}
            <ArrowBackIosIcon className="arrow-icon" />
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.tool}>
        <ReactImageAnnotate
          enabledTools={["create-box", "create-polygon"]}
          labelImages
          regionClsList={JSON.parse(localStorage.getItem("DesignatedTag"))}
          regionTagList={JSON.parse(localStorage.getItem("feedTag"))}
          images={[
            {
              src: localStorage.getItem("anImage"),
              name: props.id,
              regions: [],
            },
          ]}
          onCommentInputClick={(value) => {
            console.log(value);
          }}
          onExit={(value) => {
            let widthValue = value.images[0].pixelSize.w;
            let heightValue = value.images[0].pixelSize.h;
            coordinates(value.images[0].regions, widthValue, heightValue);
          }}
        />
      </div>
    </div>
  );
});

// export class _Annotation extends React.Component {
//   store;
//   id;
//   machineId;
//   constructor(props) {
//     super(props);
//     this.store = new LayoutStore();
//     this.id = props.match.params.id;
//   }

//   async componentDidMount() {
//     await this.store.getTags();
//     await this.store.getCameraDetails();
//     appState.cameraDetails?.find((camera, index) => {
//       if (camera.cameraId === this.id) {
//         this.machineId = camera.machineId;
//         appState.camearaValue = camera;
//         localStorage.setItem("anImage", appState.camearaValue.image);
//       }
//     });
//   }
//   render() {
//     return (
//       <AnnotationPage
//         store={this.store}
//         id={this.id}
//         machineId={this.machineId}
//       />
//     );
//   }
// }
const _Annotation = (props) => {
  console.log(props);
  const store = new LayoutStore();
  const id = props.match.params.id;
  let machineId = null;

  const initialCall = async () => {
    await store.getTags();
    await store.getCameraDetails();
    appState.cameraDetails?.find((camera, index) => {
      if (camera.cameraId === id) {
        machineId = camera.machineId;
        appState.camearaValue = camera;
        localStorage.setItem("anImage", appState.camearaValue.image);
      }
    });
  };

  React.useEffect(() => {
    initialCall();
  }, [appState.camearaValue.image]);

  return <AnnotationPage store={store} id={id} machineId={machineId} />;
};

export const Annotation = withRouter(_Annotation);
