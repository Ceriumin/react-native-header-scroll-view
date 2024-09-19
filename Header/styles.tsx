import { StyleSheet } from 'react-native';

const headerHeight = 80;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent'},
  headerContainer: {
    height: headerHeight,
  },
  headerComponentContainer: {
    height: headerHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingBottom: 12,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.019,
  },
  title: {
    letterSpacing: 0.011,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginLeft: 16,
  },
});

export default styles;