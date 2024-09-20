import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent,  } from 'react-native';
import { useEffect, useState, useRef } from 'react';

export const useHeaderAnimation = () => {

    const { height } = Dimensions.get('window');
    const [headerHeight, setHeaderHeight] = useState(0);
    const [headerY, setHeaderY] = useState(0);

    const [headerTextOpacity] = useState(new Animated.Value(0)); 
    const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;

    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        /*Offsets are calibrated perfectly for the header*/
        const offset = event.nativeEvent.contentOffset.y;
        const scrollHeaderOffset = headerHeight + headerY - 1.5;
    
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

    const animatedScale = scrollAnimatedValue.interpolate({
        inputRange: [-height, 0],
        outputRange: [1.5, 1], 
        extrapolate: 'clamp',
      });    

    useEffect(() => {
    Animated.timing(headerTextOpacity, {
        toValue: isHeaderScrolled ? 1 : 0, 
        duration: 150, 
        useNativeDriver: true, 
    }).start();
    }, [isHeaderScrolled, headerTextOpacity]);

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 10],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return { 
        handleScroll, 
        onLayout, 
        animatedScale, 
        scrollAnimatedValue, 
        headerTextOpacity, 
        headerOpacity 
    };
}