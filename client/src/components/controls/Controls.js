import React from 'react';
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import PlayButton from "./PlayButton";
import Root from "../../containers/Root/Root";
import Status from "./Status";
import SyncButton from "./SyncButton";

const Controls = (props) => (
    <Root>
        <div className="buttons are-medium">
            <PlayButton isPaused={props.isPaused} playClickHandler={props.playClickHandler}/>
            <PreviousButton goBackClicked={props.goBackHandler}/>
            <NextButton goForwardClicked={props.goForwardHandler}/>
            <SyncButton isSynced={props.isSynced} syncClicked={props.syncHandler}/>
        </div>
        <Status latestUpdate={props.latestUpdate} current={props.current} total={props.total}/>
    </Root>
);

export default Controls;