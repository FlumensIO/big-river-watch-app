import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import {
  closeCircleOutline,
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
  prettyPrintGridRef,
  useToast,
} from '@flumens';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import config from 'common/config';
import { hasGPSPermissions } from 'common/helpers/GPS';
import Record from 'models/record';
import Footer from './Components/Footer';
import Header from './Components/Header';

const markerPaint = {
  'circle-color': '#32F3E3',
  'circle-stroke-color': '#32F3E3',
  'circle-radius': 10,
};

type OfflineLocationProps = { record: Record; onGPSClick: any };
const OfflineLocation = ({ record, onGPSClick }: OfflineLocationProps) => {
  const { location } = record.attrs;
  const hasLocation = Number.isFinite(location.latitude);
  const gridref = location.gridref && prettyPrintGridRef(location.gridref);

  const latLng = hasLocation
    ? `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}`
    : '';

  const accuracy = location.accuracy?.toFixed(0);

  return (
    <>
      <InfoMessage icon={warningOutline} className="info-message warning">
        Looks like you're offline. The map view is only available with an
        internet connection. You can still use the GPS to set your current
        survey location.
      </InfoMessage>

      <div className="m-3 rounded bg-white p-5 text-base">
        <div>
          <div>
            <div className="mb-3 text-center font-bold">
              <T>Current survey location</T>
            </div>
            <ul className="mx-4 list-disc">
              {!!latLng && (
                <li>
                  <T>Coordinates</T>: {latLng}
                </li>
              )}
              {!!gridref && (
                <li>
                  <T>OS Grid</T>: {gridref}
                </li>
              )}
              {!!accuracy && (
                <li>
                  <T>Accuracy</T>: ±{accuracy}m
                </li>
              )}
            </ul>
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
    </>
  );
};

type Props = { sample: Record };

const Location = ({ sample: record }: Props) => {
  const toast = useToast();

  const { location } = record.attrs;
  const hasAccuracy =
    Number.isFinite(location.accuracy) && location.accuracy! < 100;

  const [showInfo, setShowInfo] = useState(true);
  const closeInfoMessage = () => setShowInfo(false);

  const setLocation = async (newLocation: any) => {
    if (!newLocation) return;
    if (record.isGPSRunning()) record.stopGPS();

    // eslint-disable-next-line no-param-reassign
    record.attrs.location = { ...record.attrs.location, ...newLocation };
  };

  const onMapClick = (e: any) => setLocation(mapEventToLocation(e));
  const onGPSClick = async () => {
    const hasPermissions = await hasGPSPermissions();
    if (!hasPermissions) {
      toast.warn('Location services are not enabled');
      return;
    }
    toggleGPS(record);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { gridref, ...locationWithoutGridRef } = location;

  const [mapRef, setMapRef] = useState<MapRef>();
  const flyToLocation = () => mapFlyToLocation(mapRef, locationWithoutGridRef);
  useEffect(flyToLocation, [mapRef, locationWithoutGridRef]);

  const isComplete =
    Number.isFinite(location.latitude) && Number.isFinite(location.longitude);

  return (
    <Page id="survey-location">
      <Header />

      <Main className="[--padding-top:0]" forceOverscroll={false}>
        {!device.isOnline && (
          <OfflineLocation record={record} onGPSClick={onGPSClick} />
        )}

        {device.isOnline && showInfo && (
          <InfoMessage
            skipTranslation
            className="info-message absolute left-1/2 top-0 z-10 !mx-0 w-[calc(100%-20px)] -translate-x-1/2"
          >
            <IonButton
              onClick={closeInfoMessage}
              fill="clear"
              className="absolute -right-6 top-0"
            >
              <IonIcon icon={closeCircleOutline} slot="icon-only" />
            </IonButton>
            <div className="font-medium">
              <T>
                Enable your GPS to set your location, or use the map to zoom in
                and tap on your location.
              </T>
            </div>
            <InfoButton label="READ MORE" header="Info">
              <p>
                <T>
                  Please zoom in to find the spot that best matches your
                  location.
                </T>
              </p>
              <p className="mt-3">
                <T>
                  Make sure you have the GPS turned on and permissions granted.
                  If you are conducting the survey offline or without a network
                  connection, the app will not find your location on the map,
                  but your GPS should record this for uploading later.
                </T>
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
              isLocating={!!record.gps.locating}
              onClick={onGPSClick}
              className={clsx(showInfo && '!mt-48')}
            />
            {hasAccuracy && (
              <MapContainer.Control>
                <div className="mx-auto flex h-[41px] w-[41px] flex-col items-center justify-center rounded-full bg-white/90 text-center text-xs font-semibold text-slate-800 shadow-lg">
                  ±{location.accuracy?.toFixed(0)}m
                </div>
              </MapContainer.Control>
            )}

            <MapContainer.Marker.Circle paint={markerPaint} {...location} />
          </MapContainer>
        )}
      </Main>

      {isComplete && <Footer comingFrom="Location" />}
    </Page>
  );
};

export default observer(Location);
