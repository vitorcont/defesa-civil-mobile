import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Linking, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LocationObjectCoords } from 'expo-location';
import { useLinkTo } from '@react-navigation/native';
import {
  AnimatedWarning,
  Box,
  Button,
  Col,
  MapBottomModal,
  MapMarker,
  MapStatusCard,
  PolygonBuilder,
  PureModal,
  Row,
  StatusCard,
  StyledText,
} from '@mobile/components';
import * as S from './styles';
import theme from '@mobile/theme';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import {
  getUserLocation,
  isPointInside,
  verifyAreaInsideAreas,
  verifyPointInsideAreas,
} from '@mobile/services/location';
import WarningModal from '@mobile/components/modules/WarningModal/WarningModal';
import { mapPolygons } from '@mobile/services/polyMocks';
import { RiskStatusEnum } from '@mobile/enum/status';

const Map = () => {
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
  const [iconsVisible, setIconsVisible] = useState(false);
  const [riskStatus, setRiskStatus] = useState<models.PolyArea | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [informationModal, setInformationModal] = useState({
    information: false,
    index: 0,
  });

  const handleIconVisibility = (region: Region) => {
    if (iconsVisible && region.longitudeDelta > 4) {
      setIconsVisible(false);
    }
    if (!iconsVisible && region.longitudeDelta < 4) {
      setIconsVisible(true);
    }
  };

  const setDeviceLocation = async () => {
    const location = await getUserLocation();
    if (location) setRiskStatus(verifyPointInsideAreas(location, mapPolygons));
    setUserLocation(location);
  };

  const zoomIn = (coord: LatLng) => {
    mapRef.current &&
      mapRef.current.animateToRegion({
        latitude: coord.latitude,
        longitude: coord.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
  };

  const centerUserLocation = () => {
    if (userLocation && mapRef.current) {
      zoomIn(userLocation);
    }
  };

  useEffect(() => {
    setDeviceLocation();

    const timeout = setTimeout(() => {
      setDeviceLocation();
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Box flex={1}>
        <S.Map
          initialRegion={{
            latitude: -16.255448,
            longitude: -47.150932,
            latitudeDelta: 40,
            longitudeDelta: 40,
          }}
          onRegionChange={handleIconVisibility}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}>
          {!!userLocation && (
            <MapMarker
              coordinate={userLocation}
              backgroundColor={theme.colors.secundary}
              onPress={() => zoomIn(userLocation)}
              icon={<MaterialIcons name="location-history" size={30} color={theme.colors.white} />}
            />
          )}
          {mapPolygons.map((poly, index) => (
            <>
              <PolygonBuilder
                holes={verifyAreaInsideAreas(poly, mapPolygons)}
                iconsVisible={iconsVisible}
                variant={poly.status as any}
                onPressIcon={(coords) => {
                  zoomIn(coords);
                  setTimeout(() => {
                    setInformationModal({
                      index,
                      information: true,
                    });
                  }, 600);
                }}
                coordinates={poly.coordinates}
              />
            </>
          ))}
        </S.Map>
        <AnimatedWarning variant={riskStatus?.status ?? RiskStatusEnum.SAFE} />
        <Box position="absolute" top="8%" alignSelf="center">
          <MapStatusCard variant={riskStatus?.status ?? RiskStatusEnum.SAFE} />
        </Box>
        <Row
          position="absolute"
          bottom="8%"
          justifyContent="space-between"
          alignSelf="center"
          alignItems="flex-end"
          width="90%">
          <Button
            StartAdornment={
              <Ionicons name="ios-home-outline" size={18} color={theme.colors.white} />
            }
            backgroundColor={theme.colors.secundary}
            label="Endereços"
          />
          <Box alignItems="flex-end">
            <Box marginBottom="15px">
              <Button
                StartAdornment={
                  <MaterialIcons name="gps-fixed" size={24} color={theme.colors.white} />
                }
                backgroundColor={theme.colors.secundary}
                onPress={centerUserLocation}
              />
            </Box>
            <Button
              StartAdornment={<Feather name="phone" size={18} color={theme.colors.white} />}
              backgroundColor={theme.colors.secundary}
              label="Discar 199"
              onPress={() => Linking.openURL(`tel:${199}`)}
            />
          </Box>
        </Row>
      </Box>
      <WarningModal
        variant={mapPolygons[informationModal.index].status as any}
        title={mapPolygons[informationModal.index].title}
        description={mapPolygons[informationModal.index].description}
        setVisible={(value) => setInformationModal({ ...informationModal, information: value })}
        visible={informationModal.information}
      />
      <MapBottomModal />
    </>
  );
};

export default Map;
