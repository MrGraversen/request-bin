import React, {useState, useEffect} from 'react';
import Root from "../Root/Root";
import Controls from "../../components/controls/Controls";
import HttpRequest from "../HttpRequest/HttpRequest";
import useRequestBin from "../../hooks/UseRequestBin";

const httpRequestHistory = [];

const updateHistory = (httpRequest) => {
    if (httpRequest !== null) {
        httpRequestHistory.push(httpRequest);
    }
};

const ControlPanel = (props) => {
    const [latestHttpRequest, setLatestHttpRequest] = useState(null);
    useEffect(() => updateHistory(latestHttpRequest));
    useRequestBin(props.binId, setLatestHttpRequest);

    console.log(httpRequestHistory);

    return (
        <Root>
            <Controls/>
            <hr/>
            <HttpRequest/>
        </Root>
    );
};

export default ControlPanel;