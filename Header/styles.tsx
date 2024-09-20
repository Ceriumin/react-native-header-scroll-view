import { StyleSheet } from 'react-native';

/*Plan on releasing this as public source however everything here is custom for
my own purposes and project*/
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent'},

  headerComponentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingBottom: 12,
  },
  headerBottomBorder:{
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.019,
  },
  title: {
    letterSpacing: 0.011,
    fontSize: 34,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginLeft: 16,
  },
});

export default styles;