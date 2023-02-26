import BottomSheet from '@gorhom/bottom-sheet';
import { RawBottomModal } from '@mobile/components/elements';
import React, { forwardRef } from 'react';

export interface MapBottomModalProps {}

const MapBottomModal = forwardRef<BottomSheet, MapBottomModalProps>((props, ref) => {
  return (
    <RawBottomModal {...props} ref={ref} snapPoints={['6%', '80%']}>
      <></>
    </RawBottomModal>
  );
});

export default MapBottomModal;
