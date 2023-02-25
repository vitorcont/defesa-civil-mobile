import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LocationObjectCoords } from 'expo-location';
import { useLinkTo } from '@react-navigation/native';
import { Box, Button, StyledText } from '@mobile/components';
import * as S from './styles';
import theme from '@mobile/theme';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

const Map = () => {
  const dispatch = useDispatch();
  const linkTo = useLinkTo();
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [follow, setFollow] = useState<string | null>(null);

  return (
    <Box flex={1}>
      <S.Map ref={mapRef} provider={PROVIDER_GOOGLE}></S.Map>
      <Box position="absolute" top="8%" alignSelf="center">
        <Box
          pdHorizontal="10px"
          pdVertical="5px"
          alignItems="center"
          backgroundColor={theme.colors.secundary}
          flexDirection="row"
          borderRadius="26px">
          <Box
            marginRight="10px"
            borderRadius="30px"
            backgroundColor="green"
            width="10px"
            height="10px"
          />
          <StyledText fontFamily={theme.fonts.semiBold} value="Você está seguro" />
        </Box>
      </Box>
      <Box
        position="absolute"
        flexDirection="row"
        bottom="8%"
        justifyContent="space-between"
        alignSelf="center"
        alignItems="flex-end"
        width="90%">
        <Button
          StartAdornment={<Ionicons name="ios-home-outline" size={18} color={theme.colors.white} />}
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
            />
          </Box>
          <Button
            StartAdornment={<Feather name="phone" size={18} color={theme.colors.white} />}
            backgroundColor={theme.colors.secundary}
            label="Discar 199"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
