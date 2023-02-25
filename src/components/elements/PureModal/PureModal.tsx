import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import * as S from './PureModal.styles';

interface IPureModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: React.ReactNode;
}

const PureModal: React.FC<IPureModalProps> = ({
  visible,
  setVisible,
  children,
}) => {
  return (
    <>
      {visible && <S.Blur />}
      <Modal
        animationType="fade"
        visible={visible}
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <S.Overlay>
            <TouchableWithoutFeedback>
              <S.Container>{children}</S.Container>
            </TouchableWithoutFeedback>
          </S.Overlay>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default PureModal;
