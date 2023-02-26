import { Box, Col, StyledText } from '@mobile/components/elements';
import theme from '@mobile/theme';
import { StatusCard } from '@mobile/components';
import { MapPolygon, MapPolygonProps, Marker } from 'react-native-maps';

export interface PolygonBuilderProps extends MapPolygonProps {
  variant: 'safe' | 'attention' | 'danger' | 'evacuate';
}

const PolygonBuilder = (props: PolygonBuilderProps) => {
  const getFillColor = () => {
    const colors = {
      safe: 'transparent',
      attention: theme.colors.attentionFill,
      danger: theme.colors.dangerFill,
      evacuate: theme.colors.evacuateFill,
    };

    return colors[props.variant];
  };

  const getStrokeColor = () => {
    const colors = {
      safe: 'transparent',
      attention: theme.colors.attention,
      danger: theme.colors.danger,
      evacuate: theme.colors.evacuate,
    };

    return colors[props.variant];
  };

  const getMarkerCoordinates = () => {
    const latSum = props.coordinates.reduce((prev, current) => ({
      latitude: prev.latitude + current.latitude,
      longitude: prev.longitude + current.longitude,
    }));

    const markerCoords = {
      latitude: latSum.latitude / props.coordinates.length ?? 1,
      longitude: latSum.longitude / props.coordinates.length ?? 1,
    };

    return markerCoords;
  };

  return (
    <>
      {props.variant !== 'safe' && (
        <>
          <MapPolygon
            {...props}
            strokeColor={getStrokeColor()}
            strokeWidth={2}
            fillColor={getFillColor()}
          />
          <Marker coordinate={getMarkerCoordinates()} />
        </>
      )}
    </>
  );
};

export default PolygonBuilder;
