import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import StepInfo from './StepInfo';

const module = "nasMonitor";

const styles = theme => ({
    root: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 20,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
})


class NASJobInfo extends React.Component {

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Link to="/nas_monitor">
                    <Button variant={"contained"} color={"primary"}>
                        Back
                    </Button>
                </Link>
                <Typography variant={"h5"}>
                    JOB INFO for {this.props.match.params.id}
                </Typography>
                <br />
                {this.props.steps.map((step, i) => {
                    return (
                        <ExpansionPanel key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{step.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                               <StepInfo step={step} id={this.props.match.params.id}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                })}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        steps: state[module].steps,
    }
}


export default connect(mapStateToProps, null)(withStyles(styles)(NASJobInfo));