import React from "react";
import ContentLoader from "react-content-loader";
import Title from "../ui/title";
const width = "100%";
const height = "100%";
const tdHeight = 150;
const CardLoader = () => (
    <>
        <Title>Dashboard</Title>
        <ContentLoader
            preserveAspectRatio="xMinYMin"
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 1200 150"
            backgroundColor="#f7f3f3"
            foregroundColor="#ecebeb"
            className="hidden xl:block"
        >
            <rect x="0" y="36" rx="0" ry="0" width="320" height={tdHeight} />
            <rect x="430" y="34" rx="0" ry="0" width="320" height={tdHeight} />
            <rect x="840" y="35" rx="0" ry="0" width="320" height={tdHeight} />
        </ContentLoader>

        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 1200 400"
            backgroundColor="#f7f3f3"
            foregroundColor="#ecebeb"
            preserveAspectRatio="xMinYMin"
            className="sm:block xl:hidden hidden"
        >
            <rect x="100" rx="0" ry="0" width={"400"} height={tdHeight} />
            <rect x="630" rx="0" ry="0" width={"400"} height={tdHeight} />
            <rect x="400" y="200" rx="0" ry="0" width={"400"} height={tdHeight} />
        </ContentLoader>

        <ContentLoader
            preserveAspectRatio="xMinYMin"
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 1200 1000"
            backgroundColor="#f7f3f3"
            foregroundColor="#ecebeb"
            className="sm:hidden block"
        >
            <rect x="250" rx="0" ry="0" width={"700"} height={"300"} />
            <rect x="250" y="340" rx="0" ry="0" width={"700"} height={"300"} />
            <rect x="250" y="680" rx="0" ry="0" width={"700"} height={"300"} />
        </ContentLoader>
    </>
);

export default CardLoader;
