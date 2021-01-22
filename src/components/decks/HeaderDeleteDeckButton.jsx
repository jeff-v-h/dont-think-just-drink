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

const HeaderDeleteDeckButton = ({ deckId, navigate }) => {
  const confirmDelete = async () => {
    const selectedDeck = await StorageService.getSelectedDeck();
    if (selectedDeck.id === deckId) {
      Alert.alert('', 'Cannot delete a selected deck');
      return;
    }

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
    <View style={styles.headerRightIconWrapper}>
      <IconButton onPress={confirmDelete} iconName="trash-o" size={26} opacity={0.5} />
    </View>
  );
};

HeaderDeleteDeckButton.propTypes = propTypes;

export default HeaderDeleteDeckButton;
