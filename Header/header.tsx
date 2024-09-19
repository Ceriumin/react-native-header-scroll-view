
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import { 
  Animated, 
  Dimensions, 
  NativeScrollEvent,
  NativeSyntheticEvent, 
  ScrollView, 
  TextStyle, 
  ViewStyle,
  View,
  Text,
} from 'react-native';
const { height } = Dimensions.get('window');

interface MyComponentProps {
  children: React.ReactNode;
  title?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  headerContainerStyle?: ViewStyle;
  headerComponentContainerStyle?: ViewStyle;
  headlineStyle?: TextStyle;
  scrollContainerStyle?: ViewStyle;
  scrollViewProps?: object; 
}

const HeaderScrollView: React.FC<MyComponentProps> = ({
  children,
  title,
  titleStyle,
  containerStyle,
  headerContainerStyle,
  headerComponentContainerStyle,
  headlineStyle,
  scrollContainerStyle,
  scrollViewProps,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerY, setHeaderY] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = headerHeight + headerY - 3;

    const scrollOffset = -(scrollHeaderOffset - offset) - 5;
    const scrolled = scrollHeaderOffset < offset;
    if (!isHeaderScrolled && scrolled) {
      setIsHeaderScrolled(true);
    }

    if (isHeaderScrolled && !scrolled) {
      setIsHeaderScrolled(false);
    }

    scrollY.setValue(scrollOffset);

  };

  const onLayout = (event: any) => {
    setHeaderHeight(event.nativeEvent.layout.height);
    setHeaderY(event.nativeEvent.layout.y);
  };

  useEffect(() => {
    scrollAnimatedValue.addListener(() => {});

    return () => {
      scrollAnimatedValue.removeAllListeners();
    };
  }, []);

  const fontSize = 34;

  const titleStyles = {
    fontSize,
    lineHeight: fontSize * 1.2,
  };
  const animatedScale = scrollAnimatedValue.interpolate({
    inputRange: [-height, 0],
    outputRange: [1.75, 1], // Adjust these scale values as needed
    extrapolate: 'clamp',
  });    

  const [headerOpacity] = useState(new Animated.Value(0)); 

  
  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: isHeaderScrolled ? 1 : 0, 
      duration: 250, 
      useNativeDriver: true, 
    }).start();
  }, [isHeaderScrolled, headerOpacity]);

  return (
    <>
        <View style={[styles.headerComponentContainer, headerComponentContainerStyle]}>
          <Animated.Text style={[styles.headline, headlineStyle, {opacity: headerOpacity}]}>{title}</Animated.Text>
          <Animated.View style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            opacity: scrollY.interpolate({
              inputRange: [0, 10],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }} />
        </View>
      <ScrollView
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }], {
        useNativeDriver: false,
        listener: handleScroll,
      })}
      scrollEventThrottle={8}
      contentContainerStyle={scrollContainerStyle}
      {...scrollViewProps}
      >
      <View>
        <Animated.Text
        style={[
          styles.title,
          titleStyle,
          titleStyles,
          {
          transform: [{ scale: animatedScale }],
          transformOrigin: 'bottom left'
          },
        ]}
        onLayout={onLayout}
        >
        {title}
        </Animated.Text>
      </View>
      {children}
      </ScrollView>
    </>
    );
};

export default HeaderScrollView;
