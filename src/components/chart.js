// should this be a class based component or function based component
// we don't need to make use of any component state in our chart
// some props come in and we render the component
// we can just make this a function based component

// this is so generic it could be used in other projects
import _ from 'lodash';
import React from 'react';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';

function average(data) {
    return _.round(_.sum(data) / data.length);
}

export default (props) => {
    return (
        <div>
            <Sparklines height={120} width={180} data={props.data}>
                <SparklinesLine color={props.color} />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{average(props.data)} {props.units}</div>
        </div>
    )
}