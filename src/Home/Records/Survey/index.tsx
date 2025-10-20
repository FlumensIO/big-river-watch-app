import { SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { locationOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { useToast, useAlert, prettyPrintLocation } from '@flumens';
import {
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from '@ionic/react';
import riverIcon from 'common/images/river.svg';
import Record, { useValidateCheck } from 'models/record';
import OnlineStatus from './OnlineStatus';
import './styles.scss';

function useDeleteSurveyPrompt(record: Record) {
  const alert = useAlert();

  function deleteSurvey() {
    alert({
      header: 'Delete',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => record.destroy(),
        },
      ],
    });
  }
  return deleteSurvey;
}

type Props = {
  record: Record;
  uploadIsPrimary?: boolean;
  style?: any;
};

const Survey = ({ record, uploadIsPrimary, style }: Props) => {
  const toast = useToast();
  const checkRecordStatus = useValidateCheck(record);

  const showDeleteSurveyPrompt = useDeleteSurveyPrompt(record);

  const { synchronising } = record.remote;

  const canShowLink = !synchronising && !record.isDisabled();
  const href = canShowLink ? `/survey/${record.cid}/1` : undefined;

  const onUpload = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isValid = checkRecordStatus();
    if (!isValid) return;

    record.upload().catch(toast.error);
  };

  const image = record.media[0];
  let avatar = <IonIcon icon={riverIcon} className="h-3/4 w-3/4" />;

  if (image) {
    avatar = (
      <img src={image.getURL()} className="h-full w-full object-cover" />
    );
  }

  const prettyLocation = prettyPrintLocation(record.data.location);

  return (
    <IonItemSliding className="survey-list-item" style={style}>
      <IonItem routerLink={href} detail={false}>
        <div className="m-2 mr-3 flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-200">
          {avatar}
        </div>

        <div className="w-full">
          <div className="text-sm">
            {!!prettyLocation && (
              <div>
                <IonIcon icon={locationOutline} /> {prettyLocation}
              </div>
            )}
          </div>

          <div className="record-details" />
        </div>

        <OnlineStatus
          record={record}
          onUpload={onUpload}
          hasManyPending={uploadIsPrimary}
        />
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={showDeleteSurveyPrompt}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default observer(Survey);
