import { Box, Col, StyledText } from '@mobile/components/elements';
import theme from '@mobile/theme';
import { StatusCard } from '@mobile/components';

export interface MapStatusCardProps {
  variant: 'safe' | 'attention' | 'danger' | 'evacuate';
}

const MapStatusCard = (props: MapStatusCardProps) => {
  return (
    <Col
      pdVertical="5px"
      pdHorizontal="20%"
      alignItems="center"
      borderRadius="26px"
      backgroundColor={theme.colors.secundary}
      shadowBox>
      {(props.variant === 'danger' || props.variant === 'evacuate') && (
        <Box pdBottom="5px">
          <StyledText fontSize={18} fontFamily={theme.fonts.bold} value="ATENÇÃO" />
        </Box>
      )}
      <StatusCard variant={props.variant} />
    </Col>
  );
};

export default MapStatusCard;
