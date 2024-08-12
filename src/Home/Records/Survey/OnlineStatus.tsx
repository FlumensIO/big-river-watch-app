import { FC } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonSpinner, IonLabel, IonButton } from '@ionic/react';
import { Badge } from 'common/flumens';
import Record from 'models/record';
import './styles.scss';

type Props = {
  record: Record;
  onUpload: (e?: any) => void;
  hasManyPending?: boolean;
};

const OnlineStatus: FC<Props> = ({ record, onUpload, hasManyPending }) => {
  const { saved } = record.metadata;
  if (!saved) return <Badge className="max-w-32">Draft</Badge>;

  if (record.remote.synchronising) {
    return <IonSpinner className="mr-2 max-w-[80px]" color="primary" />;
  }

  if (record.isDisabled()) return null;

  const isValid = !record.validateRemote();

  return (
    <IonButton
      color={isValid ? 'secondary' : 'medium'}
      fill={hasManyPending ? 'outline' : 'solid'}
      shape="round"
      className="pr-3 !text-xs"
      onClick={onUpload}
      size="small"
    >
      <IonLabel className="px-2">
        <T>Upload</T>
      </IonLabel>
    </IonButton>
  );
};

export default observer(OnlineStatus);
