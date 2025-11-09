import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { ButtonVariant, ButtonSize, IconPosition } from '../../types/enums';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  size?: ButtonSize;
  outline?: boolean;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = ButtonVariant.PRIMARY,
  disabled = false,
  icon,
  iconPosition = IconPosition.LEFT,
  fullWidth = false,
  size = ButtonSize.MEDIUM,
  outline = false,
  active = false,
}) => {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    styles[`button_${size}` as keyof typeof styles] as ViewStyle,
    outline ? styles[`button_${variant}_outline` as keyof typeof styles] as ViewStyle : styles[`button_${variant}` as keyof typeof styles] as ViewStyle,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    active && !disabled && styles.active,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`text_${size}` as keyof typeof styles] as TextStyle,
    outline ? styles[`text_${variant}_outline` as keyof typeof styles] as TextStyle : (variant === ButtonVariant.SECONDARY && styles.text_secondary),
    active && !disabled && styles.text_active,
  ].filter(Boolean) as TextStyle[];

  // Clone icon with active color if needed
  const getIconWithColor = (iconElement: React.ReactNode) => {
    if (!iconElement || !React.isValidElement(iconElement)) return iconElement;
    
    if (active && !disabled) {
      return React.cloneElement(iconElement as React.ReactElement<any>, {
        color: '#0c2f6e',
      });
    }
    
    return iconElement;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && iconPosition === IconPosition.LEFT && (
        <View style={styles.iconLeft}>{getIconWithColor(icon)}</View>
      )}
      <Text style={textStyle}>{title}</Text>
      {icon && iconPosition === IconPosition.RIGHT && (
        <View style={styles.iconRight}>{getIconWithColor(icon)}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1.5,
  },
  button_medium: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1.5,
  },
  button_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1.5,
  },
  button_primary: {
    backgroundColor: '#0c2f6e',
  },
  button_secondary: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#1e4db7',
  },
  button_success: {
    backgroundColor: '#10b981',
  },
  button_danger: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ef4444',
  },
  button_warning: {
    backgroundColor: '#f59e0b',
  },
  button_info: {
    backgroundColor: '#103a8c',
  },
  button_purple: {
    backgroundColor: '#0a2351',
  },
  button_primary_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0c2f6e',
  },
  button_secondary_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#1e4db7',
  },
  button_success_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#10b981',
  },
  button_danger_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#ef4444',
  },
  button_warning_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#f59e0b',
  },
  button_info_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#103a8c',
  },
  button_purple_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0a2351',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  active: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0c2f6e',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: '#fff',
  },
  text_small: {
    fontSize: 13,
  },
  text_medium: {
    fontSize: 14,
  },
  text_large: {
    fontSize: 16,
  },
  text_secondary: {
    color: '#1e4db7',
  },
  text_primary_outline: {
    color: '#0c2f6e',
  },
  text_secondary_outline: {
    color: '#1e4db7',
  },
  text_success_outline: {
    color: '#10b981',
  },
  text_danger_outline: {
    color: '#ef4444',
  },
  text_warning_outline: {
    color: '#f59e0b',
  },
  text_info_outline: {
    color: '#103a8c',
  },
  text_purple_outline: {
    color: '#0a2351',
  },
  text_active: {
    color: '#0c2f6e',
    fontWeight: '700',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
