// import {inject, observer} from "mobx-react";
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';
//
// interface iProps {
//     data: number[];
//     width: number;
//     height: number;
//     margin?: {
//         top: number;
//         right: number;
//         bottom: number;
//         left: number;
//     };
// }
//
// const Histogram: React.FC<iProps> = ({ data, width, height, margin = { top: 10, right: 30, bottom: 30, left: 40 } }) => {
//     const ref = useRef<SVGSVGElement | null>(null);
//
//     useEffect(() => {
//         const svg = d3.select(ref.current);
//
//         const x = d3.scaleLinear()
//             .domain([0, d3.max(data) as number])
//             .range([0, width - margin.left - margin.right]);
//
//         const histogram = d3.histogram()
//             .value(function(d) { return d; })
//             .domain(x.domain() as [number, number])
//             .thresholds(x.ticks(10));
//
//         const bins = histogram(data);
//
//         const y = d3.scaleLinear()
//             .range([height - margin.top - margin.bottom, 0])
//             .domain([0, d3.max(bins, function(d) { return d.length; }) as number]);
//
//         svg.select(".x-axis")
//             .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
//             .call(d3.axisBottom(x));
//
//         svg.select(".y-axis")
//             .call(d3.axisLeft(y));
//
//         svg.selectAll(".bar")
//             .data(bins)
//             .join("rect")
//             .attr("class", "bar")
//             .attr("x", function(d) { return x(d.x0) + margin.left; })
//             .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
//             .attr("y", function(d) { return y(d.length) + margin.top; })
//             .attr("height", function(d) { return height - margin.top - margin.bottom - y(d.length); })
//             .style("fill", "steelblue");
//     }, [data, height, margin.bottom, margin.left, margin.right, margin.top, width]);
//
//     return (
//         <svg ref={ref} width={width} height={height}>
//             <g className="x-axis" />
//             <g className="y-axis" />
//         </svg>
//     );
// };
//
//
//
//
//
// export const StatExample = observer((props) => {
//
//     const data = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//
//     return (
//         <div>
//             <Histogram data={data} width={1000} height={400} />
//         </div>
//
//
//     );
// });
//
import { inject, observer } from "mobx-react";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface iProps {
    data: number[];
    width: number;
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

const Histogram: React.FC<iProps> = ({
                                         data,
                                         width,
                                         height,
                                         margin = { top: 10, right: 30, bottom: 30, left: 40 },
                                     }) => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(ref.current);

        const x = d3
            .scaleLinear()
            .domain([0, d3.max(data) as number])
            .range([0, width - margin.left - margin.right]);

        const histogram = d3
            .histogram()
            .value(function (d) {
                return d;
            })
            .domain(x.domain() as [number, number])
            .thresholds(x.ticks(10));

        const bins = histogram(data);

        const y = d3
            .scaleLinear()
            .range([height - margin.top - margin.bottom, 0])
            .domain([0, d3.max(bins, function (d) {
                return d.length;
            }) as number]);

        svg.select(".x-axis")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(
                d3.axisBottom(x).tickSizeOuter(0).tickPadding(8).tickFormat(d3.format(""))
            );

        svg.select(".y-axis")
            .call(
                d3.axisLeft(y).tickSizeInner(-(width - margin.left - margin.right)).tickPadding(8).tickFormat(d3.format(".2s"))
            );

        svg.selectAll(".bar")
            .data(bins)
            .join("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.x0) + margin.left;
            })
            .attr("width", function (d) {
                return x(d.x1) - x(d.x0) - 1;
            })
            .attr("y", function (d) {
                return y(d.length) + margin.top;
            })
            .attr("height", function (d) {
                return height - margin.top - margin.bottom - y(d.length);
            })
            .style("fill", "#006699");
    }, [
        data,
        height,
        margin.bottom,
        margin.left,
        margin.right,
        margin.top,
        width,
    ]);

    return (
        <svg ref={ref} width={width} height={height}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    );
};

export const StatExample = observer((props) => {
    const data = [10, 20, 30, 40, 50, 60, 70, 80, 90];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Histogram Example</h1>
            <Histogram data={data} width={800} height={400} />
        </div>
    );
});



// import { inject, observer } from "mobx-react";
// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";
//
// export const StatExample = observer((props) => {
//
//     const data = [10, 20, 30, 40, 50, 60, 70, 80, 90];
//
//     const x = d3.scale.linear()
//         .domain([0, d3.max(data)])
//         .range([0,90])
//     d3.select
//
//     return (
//         <div>
//             <h1 style={{ textAlign: "center" }}>Histogram Example</h1>
//             {/*<Histogram data={data} width={800} height={400} />*/}
//         </div>
//     );
// });