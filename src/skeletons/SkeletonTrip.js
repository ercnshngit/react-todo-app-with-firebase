import Shimmer from "./Shimmer"
import SkeletonElement from "./SkeletonElement"


const SkeletonTrip = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-trip">
                <SkeletonElement type ="title" />
                <SkeletonElement type ="price" />
            </div>
            <Shimmer />
        </div>
    )
}

export default SkeletonTrip