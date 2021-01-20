import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';
import styles from '../../styles/styles';
import StorageService from '../../services/storageService';

const propTypes = {
  deckId: PropTypes.string.isRequired,
  cardIndex: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired
};

const HeaderDeleteCardButton = ({ deckId, cardIndex, navigate }) => {
  const deleteCard = async () => {
    await StorageService.deleteCard(deckId, cardIndex);
    navigate('Deck', { reloadDeck: true });
  };

  return (
    <View style={styles.headerDeleteButtonWrapper}>
      <IconButton onPress={deleteCard} iconName="trash-o" size={26} opacity={0.5} />
    </View>
  );
};

HeaderDeleteCardButton.propTypes = propTypes;

export default HeaderDeleteCardButton;
