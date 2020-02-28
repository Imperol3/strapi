import React from 'react';
import PropTypes from 'prop-types';
import {
  LoadingIndicatorPage,
  useGlobalContext,
  request,
} from 'strapi-helper-plugin';
import { Header } from '@buffetjs/custom';

import PageTitle from '../../components/PageTitle';
import PluginCard from '../../components/PluginCard';
import Wrapper from './Wrapper';
import useFetch from './useFetch';

const MarketPlacePage = ({ history }) => {
  const {
    autoReload,
    currentEnvironment,
    formatMessage,
    plugins,
  } = useGlobalContext();
  const { isLoading, data } = useFetch();

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  const handleDownloadPlugin = async pluginId => {
    // Force the Overlayblocker to be displayed
    const overlayblockerParams = {
      enabled: true,
      title: 'app.components.InstallPluginPage.Download.title',
      description: 'app.components.InstallPluginPage.Download.description',
    };
    // Lock the app
    strapi.lockApp(overlayblockerParams);

    try {
      const opts = {
        method: 'POST',
        body: {
          plugin: pluginId,
          port: window.location.port,
        },
      };
      const response = await request(
        '/admin/plugins/install',
        opts,
        overlayblockerParams
      );

      if (response.ok) {
        // Reload the app
        window.location.reload();
      }
    } catch (err) {
      strapi.unlockApp();
      strapi.notification.error('notification.error');
    }
  };

  return (
    <div>
      <PageTitle
        title={formatMessage({
          id: 'app.components.InstallPluginPage.helmet',
        })}
      />
      <Wrapper className="container-fluid">
        <Header
          title={{
            label: formatMessage({
              id: 'app.components.InstallPluginPage.title',
            }),
          }}
          content={formatMessage({
            id: 'app.components.InstallPluginPage.description',
          })}
          actions={[]}
        />
        <div className="row" style={{ paddingTop: '4.1rem' }}>
          {data.map(plugin => {
            return (
              <PluginCard
                autoReload={autoReload}
                currentEnvironment={currentEnvironment}
                downloadPlugin={handleDownloadPlugin}
                key={plugin.id}
                history={history}
                plugin={plugin}
                showSupportUsButton={false}
                isAlreadyInstalled={plugins[plugin.id] !== undefined}
              />
            );
          })}
        </div>
      </Wrapper>
    </div>
  );
};

MarketPlacePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MarketPlacePage;
