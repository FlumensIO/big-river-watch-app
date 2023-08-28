import { useEffect } from 'react';
import { set } from 'mobx';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { useAlert } from '@flumens';
import { IonIcon } from '@ionic/react';
import Record from 'models/record';
import userModel from 'models/user';

function useShowThankYouMessage() {
  const alert = useAlert();

  const withPromise = (resolve: any) => {
    alert({
      message: (
        <div>
          <div className="text-center">
            <IonIcon
              className="text-6xl text-primary-700"
              icon={checkmarkCircleOutline}
            />
          </div>
          <h3 className="my-3 text-center text-lg">
            <T>Thank you!</T>
          </h3>

          <p className="text-center">
            <T>We appreciate you taking the time to fill out the survey.</T>
          </p>
        </div>
      ),

      buttons: [
        {
          text: 'Save for later',
          role: 'secondary',
          handler: () => resolve(),
        },
        {
          text: 'Upload',
          role: 'primary',
          handler: () => resolve(true),
        },
      ],
    });
  };

  // eslint-disable-next-line @getify/proper-arrows/name
  return () => new Promise<any>(withPromise);
}

const cacheUserDetails = (record: Record) => {
  set(userModel.attrs, {
    firstName: record.attrs.firstName,
    lastName: record.attrs.lastName,
    email: record.attrs.email,
    allowContact: record.attrs.allowContact,
    postcode: record.attrs.postcode,
    experience: 'Yes',
  });
  userModel.save();
};

type Props = { sample: Record };

const End = ({ sample: record }: Props) => {
  const showThankYouMessage = useShowThankYouMessage();

  const showUploadMessageWrap = () => {
    if (!record.metadata.saved) {
      // eslint-disable-next-line no-param-reassign
      record.metadata.saved = true;
      record.save();

      cacheUserDetails(record);

      const upload = (shouldUpload?: boolean) => {
        shouldUpload && record.saveRemote();
      };
      showThankYouMessage().then(upload);
    }
  };
  useEffect(showUploadMessageWrap, []);

  return <Redirect to="/home/records" />;
};

export default End;
