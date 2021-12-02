import {Region} from 'react-native-maps';

export const coordinateChange = (region: number, coordinate: number) => {
  const regionValue = region.toFixed(6);
  const coordinateValue = coordinate.toFixed(6);

  return regionValue !== coordinateValue;
};

export const correctCoordinates = (region: Region, coordinates: Region) => {
  const {latitude, longitude, longitudeDelta, latitudeDelta} = coordinates;

  const latitudeChange = coordinateChange(region.latitude, latitude);
  const longitudeChange = coordinateChange(region.longitude, longitude);
  const longitudeDeltaChange = coordinateChange(
    region.longitudeDelta,
    longitudeDelta,
  );
  const latitudeDeltaChange = coordinateChange(
    region.latitudeDelta,
    latitudeDelta,
  );

  return (
    !latitudeChange &&
    !longitudeChange &&
    !longitudeDeltaChange &&
    !latitudeDeltaChange
  );
};
