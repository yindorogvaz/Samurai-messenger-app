import React, {ComponentType} from "react"
import Preloader from "../componenst/Common/Preloader/Preloader"

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {

    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    }

}