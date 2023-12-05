import React from "react";
import ContentLoader from "react-content-loader";

const width = "100%";
const height = "100%";
const tdHeight = 130;
const CardLoader = () => (
    <>
        <ContentLoader
            preserveAspectRatio="xMinYMin"
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 1200 150"
            backgroundColor="#f7f3f3"
            foregroundColor="#ecebeb"
            className="hidden lg:block "
        >
            <rect x="70" y="5" rx="0" ry="0" width="298" height={tdHeight} />
            <rect x="450" y="5" rx="0" ry="0" width="298" height={tdHeight} />
            <rect x="830" y="5" rx="0" ry="0" width="298" height={tdHeight} />
        </ContentLoader>

        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox="0 0 1000 400"
            backgroundColor="#f7f3f3"
            foregroundColor="#ecebeb"
            preserveAspectRatio="xMinYMin"
            className="sm:block  lg:hidden hidden"
        >
            <rect x="60" rx="0" ry="0" width={"400"} height={tdHeight} />
            <rect x="540" rx="0" ry="0" width={"400"} height={tdHeight} />
            <rect x="300" y="200" rx="0" ry="0" width={"400"} height={tdHeight} />
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
