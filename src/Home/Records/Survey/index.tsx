import { FC, SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useToast, useAlert } from '@flumens';
import {
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
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

const Survey: FC<Props> = ({ record, uploadIsPrimary, style }) => {
  const toast = useToast();
  const checkRecordStatus = useValidateCheck(record);

  const showDeleteSurveyPrompt = useDeleteSurveyPrompt(record);

  // const { synchronising } = record.remote;

  // const canShowLink = !synchronising;
  // const href = canShowLink ? `/survey/${record.cid}` : '';

  const onUpload = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isValid = checkRecordStatus();
    if (!isValid) return;

    record.upload().catch(toast.error);
  };

  return (
    <IonItemSliding className="survey-list-item" style={style}>
      <IonItem
        // routerLink={href} // TODO:
        detail={false}
      >
        <div className="w-full">
          <h3 className="text-base">
            <T>Survey</T>
          </h3>

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
