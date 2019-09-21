import React, {useState, useEffect} from 'react';
import Root from "../Root/Root";
import Controls from "../../components/controls/Controls";
import HttpRequest from "../HttpRequest/HttpRequest";
import useRequestBin from "../../hooks/UseRequestBin";
import BlankHttpRequest from "../HttpRequest/BlankHttpRequest";

const ControlPanel = (props) => {
    const [httpRequestHistory, setHttpRequestHistory] = useState([]);
    const [latestUpdate, setLatestUpdate] = useState(null);
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const selectedHttpRequest = httpRequestHistory[index - 1];

    const playClicked = () => {
        setIsPaused(isPaused => !isPaused);
        setIndex(httpRequestHistory.length);
    };

    const goBackClicked = () => {
        setIsPaused(true);

        if (index !== 1) {
            setIndex(index => index - 1);
        }
    };

    const goForwardClicked = () => {
        if (index !== httpRequestHistory.length) {
            setIndex(index => index + 1);
        }
    };

    const updateHttpRequest = (httpRequest) => {
        setHttpRequestHistory(previousHistory => [...previousHistory, httpRequest]);

        setIndex(index => index + 1);
    };

    // useEffect(() => updateHistory(latestHttpRequest));
    useRequestBin(props.binId, updateHttpRequest, setLatestUpdate);

    const httpRequest = selectedHttpRequest === undefined
        ? <BlankHttpRequest/>
        : <HttpRequest httpRequest={selectedHttpRequest}/>;


    return (
        <Root>
            <Controls
                latestUpdate={latestUpdate}
                current={index}
                total={httpRequestHistory.length}
                playClickHandler={playClicked}
                goBackHandler={goBackClicked}
                goForwardHandler={goForwardClicked}
                isPaused={isPaused}
            />
            <hr/>
            {httpRequest}
        </Root>
    );
};

export default ControlPanel;