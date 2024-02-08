import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface PageLinkProps {
  disabled?: boolean;
  active?: boolean;
  onClick: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const PageLink: React.FC<PageLinkProps> = ({ disabled, active, onClick, children }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onClick} style={[styles.link, active && styles.active]}>
      <Text style={{ color: disabled ? styles.disabled.color : (active ? styles.active.color : styles.link.color) }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
export default PageLink; 

const styles = StyleSheet.create({
    link: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3', 
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: colors.black,
        fontSize: 16,
        fontWeight: '600',
      },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.white,
  },
  disabled: {
    color: '#A9A9A9',
  }
});
