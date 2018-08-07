import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 1000,
    backgroundColor: theme.palette.background.paper
  }
});

class JobPostDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    let jobProp = this.props.jobProp;
    let budget = jobProp.min_budget + "$ - " + jobProp.max_budget + "$";

    let skills;    
    if(typeof jobProp.skills != 'undefined'){
        skills = jobProp.skills.split(",").map((value, i) => {
          return (
            <Chip label={value} key={i} className="skillsChip" />
          );
        });
    }
    // Can add a cross(X) button to skip
    return (
      <div className={classes.root} id="jobPostDetailDiv">
        <List>
          <ListItem>
            <Typography variant="headline">{jobProp.title}</Typography>
            <ListItemText secondary={budget} />
          </ListItem>
          <ListItem>
            <ListItemText primary={jobProp.description} />
          </ListItem>
          <ListItem>
            {skills}
          </ListItem>
          <ListItem>
          <div>
            <div>Equipment included? <b>{jobProp.equipment ? "Yes" : "No"}</b></div>
            <div>Accommodations reimbursed?{" "} <b>{jobProp.accomodation ? "Yes" : "No"}</b></div>
            <div>Prefer a local freelancer?{" "} <b>{jobProp.prefer_local ? " " + jobProp.region : "No"}</b></div>
          </div>
          </ListItem>
        </List>
      </div>
    );
  }
}

JobPostDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobPostDetail);
