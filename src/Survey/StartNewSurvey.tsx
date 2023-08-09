import { useEffect, useContext } from 'react';
import { useAlert } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import records from 'models/collections/records';
import Record from 'models/record';
import survey from './config';

async function showDraftAlert(alert: any) {
  const showDraftDialog = (resolve: any) => {
    alert({
      header: 'Draft',
      message: 'Previous survey draft exists, would you like to continue it?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(showDraftDialog);
}

async function getDraft(alert: any) {
  const draftID = appModel.attrs['draftId:survey'];
  if (draftID) {
    const draftById = ({ cid }: Record) => cid === draftID;
    const draftRecord = records.find(draftById);
    if (draftRecord && !draftRecord.isDisabled()) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftRecord;
      }

      draftRecord.destroy();
    }
  }

  return null;
}

async function getNewRecord() {
  const record = await survey.create!({ Record });
  await record.save();

  records.push(record);

  appModel.attrs['draftId:survey'] = record.cid;

  return record;
}

function StartNewSurvey(): null {
  const context = useContext(NavContext);
  const alert = useAlert();

  const baseURL = `/survey`;

  const pickDraftOrCreateRecordWrap = () => {
    const pickDraftOrCreateRecord = async () => {
      let record = await getDraft(alert);
      if (!record) {
        record = await getNewRecord();
      }

      const path = '/1';

      context.navigate(`${baseURL}/${record.cid}${path}`, 'forward', 'replace');
    };

    pickDraftOrCreateRecord();
  };
  useEffect(pickDraftOrCreateRecordWrap, []);

  return null;
}

export default StartNewSurvey;
