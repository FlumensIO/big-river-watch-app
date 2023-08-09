import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  informationCircleOutline,
  locateOutline,
  warningOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { MapRef } from 'react-map-gl';
import {
  Page,
  InfoMessage,
  Main,
  MapContainer,
  mapEventToLocation,
  toggleGPS,
  InfoButton,
  mapFlyToLocation,
  device,
  prettyPrintLocation,
} from '@flumens';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import config from 'common/config';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

type OfflineLocationProps = { record: Record; onGPSClick: any };
const OfflineLocation = ({ record, onGPSClick }: OfflineLocationProps) => {
  const { location } = record.attrs;
  const prettyLocation = prettyPrintLocation(location) || 'missing';

  return (
    <>
      {!device.isOnline && (
        <InfoMessage icon={warningOutline} className="info-message warning">
          Looks like you're offline. The map view is only available with an
          internet connection. You can still use the GPS to set your current
          survey location.
        </InfoMessage>
      )}

      {!device.isOnline && (
        <div className="m-3 rounded bg-white p-5 text-base">
          <div>
            <div>
              <T>
                Current survey location:{' '}
                <b>{{ location: prettyLocation } as any}</b>
              </T>
            </div>

            <IonButton
              fill="outline"
              size="small"
              onClick={onGPSClick}
              className="m-auto mt-4 block w-2/3"
            >
              <IonIcon icon={locateOutline} slot="start" />
              {record.isGPSRunning() ? <IonSpinner /> : <T>Refresh</T>}
            </IonButton>
          </div>
        </div>
      )}
    </>
  );
};

type Props = { sample: Record };

const Location = ({ sample: record }: Props) => {
  const { location } = record.attrs;

  const setLocation = async (newLocation: any) => {
    if (!newLocation) return;
    if (record.isGPSRunning()) record.stopGPS();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { gridref, ...newLocationWithoutGridref } = newLocation;

    // eslint-disable-next-line no-param-reassign
    record.attrs.location = {
      ...record.attrs.location,
      ...newLocationWithoutGridref,
    };
  };

  const onMapClick = (e: any) => setLocation(mapEventToLocation(e));
  const onGPSClick = () => toggleGPS(record);

  const [mapRef, setMapRef] = useState<MapRef>();
  const flyToLocation = () => mapFlyToLocation(mapRef, location);
  useEffect(flyToLocation, [mapRef, location]);
  return (
    <Page id="survey-location">
      <Header />

      <Main>
        {!device.isOnline && (
          <OfflineLocation record={record} onGPSClick={onGPSClick} />
        )}

        {device.isOnline && (
          <InfoMessage
            icon={informationCircleOutline}
            className="info-message absolute left-1/2 top-0 z-10 !mx-0 w-[calc(100%-20px)] -translate-x-1/2"
          >
            Enable your GPS to set your location, or use the map to zoom in and
            tap on your location.
            <InfoButton label="READ MORE" header="Info">
              <p>
                Please zoom in to find the spot that best matches your location.
              </p>
              <p className="mt-3">
                Make sure you have the GPS turned on and permissions granted. If
                you are conducting the survey offline or without a network
                connection, the app will not find your location on the map, but
                your GPS should record this for uploading later.
              </p>
            </InfoButton>
          </InfoMessage>
        )}

        {device.isOnline && (
          <MapContainer
            onClick={onMapClick}
            accessToken={config.map.mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
            maxPitch={0}
            onReady={setMapRef}
          >
            <MapContainer.Control.Geolocate
              isLocating={record.gps.locating}
              onClick={onGPSClick}
              className="!mt-40"
            />

            <MapContainer.Marker {...location} />
          </MapContainer>
        )}
      </Main>

      <Footer comingFrom="Location" />
    </Page>
  );
};

export default observer(Location);
