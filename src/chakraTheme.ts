import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      400: '#1CCC5B',
      500: '#000000',
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: 30,
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.400',
          },
          _focus: {
            ring: 2,
            ringColor: 'primary.500',
          }
        },
        outline: {
          borderColor: 'green.500',
          color: 'green.500',
          _focus: {
            ring: 2,
            ringColor: 'primary.500',
          }
        }
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'green.500',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'green.500',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: '"Poppins", sans-serif',
      }
    }
  }
})

export default theme;
