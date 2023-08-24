import { observer } from 'mobx-react';
import { IonBadge } from '@ionic/react';
import Record from 'models/record';
import './styles.scss';

type Records = Record[];

function getPendingCount(collection: Records) {
  const byUploadStatus = (model: Record) => !model.isDisabled();

  return collection.filter(byUploadStatus).length;
}

type Props = {
  collection: Records;
};

const PendingSurveysBadge = ({ collection }: Props) => {
  const count = getPendingCount(collection);

  if (count <= 0) {
    return null;
  }

  return <IonBadge className="pending-surveys-badge">{count}</IonBadge>;
};

export default observer(PendingSurveysBadge);
