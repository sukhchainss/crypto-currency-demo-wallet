import Button from '../Button';
import { ButtonVariant, ButtonSize, IconPosition } from '../../../types/enums';

describe('Button Component', () => {
  it('should have default exports', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('should accept required props', () => {
    const props = {
      text: 'Click Me',
      onPress: jest.fn(),
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept optional variant prop', () => {
    const props = {
      text: 'Primary',
      onPress: jest.fn(),
      variant: ButtonVariant.PRIMARY,
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept optional size prop', () => {
    const props = {
      text: 'Large',
      onPress: jest.fn(),
      size: ButtonSize.LARGE,
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept disabled prop', () => {
    const props = {
      text: 'Disabled',
      onPress: jest.fn(),
      disabled: true,
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept isActive prop', () => {
    const props = {
      text: 'Active',
      onPress: jest.fn(),
      isActive: true,
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept icon with position', () => {
    const mockIcon = () => null;
    const props = {
      text: 'With Icon',
      onPress: jest.fn(),
      icon: mockIcon,
      iconPosition: IconPosition.LEFT,
    };
    expect(() => Button(props)).not.toThrow();
  });

  it('should accept custom style', () => {
    const props = {
      text: 'Styled',
      onPress: jest.fn(),
      style: { backgroundColor: 'red' },
    };
    expect(() => Button(props)).not.toThrow();
  });
});
