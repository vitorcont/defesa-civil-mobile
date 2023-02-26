import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Linking, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LocationObjectCoords } from 'expo-location';
import { useLinkTo } from '@react-navigation/native';
import {
  AnimatedWarning,
  Box,
  Button,
  MapBottomModal,
  MapStatusCard,
  PolygonBuilder,
  Row,
} from '@mobile/components';
import * as S from './styles';
import theme from '@mobile/theme';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Window from '@mobile/services/dimensions';
import { MapStatusCardProps } from '@mobile/components/modules/MapStatusCard/MapStatusCard';
import { getUserLocation } from '@mobile/services/location';

const Map = () => {
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView | null>(null);

  const setDeviceLocation = async () => {
    const location = await getUserLocation();
    setUserLocation(location);
  };

  const centerUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDeviceLocation();
    }, 20000);
  });

  const status = 'safe';

  const mapPolygons = [
    {
      id: 0,
      status: 'evacuate',
      coordinates: [
        {
          latitude: -23.4759708,
          longitude: -45.1062933,
        },
        {
          latitude: -23.4885488,
          longitude: -45.1065394,
        },
        {
          latitude: -23.4976169,
          longitude: -45.0818597,
        },
      ],
    },
  ];

  return (
    <>
      <Box flex={1}>
        <S.Map ref={mapRef} provider={PROVIDER_GOOGLE}>
          {mapPolygons.map((poly) => (
            <PolygonBuilder variant={poly.status as any} coordinates={poly.coordinates} />
          ))}
        </S.Map>
        <Box position="absolute" top="8%" alignSelf="center">
          <MapStatusCard variant={status} />
        </Box>
        <AnimatedWarning variant={status} />
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
      <MapBottomModal />
    </>
  );
};

export default Map;
