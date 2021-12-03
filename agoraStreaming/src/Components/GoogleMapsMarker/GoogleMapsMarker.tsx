import React, {FC, useEffect, useRef} from 'react';
import {Marker, MarkerProps} from 'react-native-maps';

type GoogleMapsMarkerPropsType = MarkerProps & {
  calloutIsShow: boolean;
};

export const GoogleMapsMarker: FC<GoogleMapsMarkerPropsType> = (props) => {
  const {calloutIsShow, children, ...restProps} = props;

  const markerRef = useRef<Marker | null>(null);

  useEffect(() => {
    if (calloutIsShow) {
      markerRef.current?.showCallout();
    } else {
      markerRef.current?.hideCallout();
    }
  }, [calloutIsShow]);

  return (
    <Marker ref={markerRef} {...restProps}>
      {children}
    </Marker>
  );
};
