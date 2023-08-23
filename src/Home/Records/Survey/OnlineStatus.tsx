import { FC } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonSpinner, IonLabel, IonChip, IonButton } from '@ionic/react';
import Record from 'models/record';
import './styles.scss';

type Props = {
  record: Record;
  onUpload: (e?: any) => void;
  hasManyPending?: boolean;
};

const OnlineStatus: FC<Props> = ({ record, onUpload, hasManyPending }) => {
  const { saved } = record.metadata;
  if (!saved) {
    return (
      <IonChip slot="end" className="max-w-[80px]">
        <IonLabel>
          <T>Draft</T>
        </IonLabel>
      </IonChip>
    );
  }

  if (record.remote.synchronising) {
    return <IonSpinner className="mr-2 max-w-[80px]" color="primary" />;
  }

  if (record.isDisabled()) return null;

  const isValid = !record.validateRemote();

  return (
    <IonButton
      color={isValid ? 'dark' : 'medium'}
      fill={hasManyPending ? 'outline' : 'solid'}
      shape="round"
      className="pr-3 !text-sm"
      onClick={onUpload}
    >
      <div className="px-2">
        <T>Upload</T>
      </div>
    </IonButton>
  );
};

export default observer(OnlineStatus);
