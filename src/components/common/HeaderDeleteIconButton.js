import React from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';
import styles from '../../styles/styles';
import StorageService from '../../services/storageService';

const propTypes = {
  deckId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired
};

const HeaderDeleteIconButton = ({ deckId, navigate }) => {
  const confirmDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to permanently remove this deck from your device?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          await StorageService.deleteDeck(deckId);
          navigate('DeckList', { reloadDeckList: true });
        }
      }
    ]);
  };

  return (
    <View style={styles.headerDeleteButtonWrapper}>
      <IconButton onPress={confirmDelete} iconName="trash-o" size={26} opacity={0.5} />
    </View>
  );
};

HeaderDeleteIconButton.propTypes = propTypes;

export default HeaderDeleteIconButton;