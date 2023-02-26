import { Box, Row, StyledText } from '@mobile/components/elements';
import theme from '@mobile/theme';

interface StatusCardProps {
  variant: 'safe' | 'attention' | 'danger' | 'evacuate';
}

const StatusCard = (props: StatusCardProps) => {
  const getDotColor = () => {
    const colors = {
      safe: theme.colors.safe,
      attention: theme.colors.attention,
      danger: theme.colors.dangerDot,
      evacuate: theme.colors.black,
    };

    return colors[props.variant];
  };

  const getBackgroundColor = () => {
    const colors = {
      safe: theme.colors.secundary,
      attention: theme.colors.secundary,
      danger: theme.colors.danger,
      evacuate: theme.colors.evacuate,
    };

    return colors[props.variant];
  };

  const getLabel = () => {
    const colors = {
      safe: 'Você está seguro',
      attention: 'Tenha cuidado',
      danger: 'Busque abrigo',
      evacuate: 'Evacue a área',
    };

    return colors[props.variant];
  };

  return (
    <Row
      pdHorizontal="10px"
      pdVertical="5px"
      alignItems="center"
      backgroundColor={getBackgroundColor()}
      borderRadius="26px">
      <Box
        marginRight="10px"
        borderRadius="30px"
        backgroundColor={getDotColor()}
        width="10px"
        height="10px"
      />
      <StyledText fontFamily={theme.fonts.semiBold} value={getLabel()} />
    </Row>
  );
};

export default StatusCard;
