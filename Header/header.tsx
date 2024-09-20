import { useHeaderAnimation } from './animation'; 
import styles from './styles';
import { 
  Animated, 
  ScrollView, 
  View,
} from 'react-native';

interface MyComponentProps {
  children: React.ReactNode;
  height?: number;
  isTitleVisible?: boolean;
  title?: string;
  headerContent?: () => React.ReactNode;  
  isLargeTitleVisible?: boolean;
  largeTitleHeight?: number;
}

const HeaderScrollView: React.FC<MyComponentProps> = ({
  children,
  height = 80,
  isTitleVisible = true,
  title,
  headerContent,
  isLargeTitleVisible = true,
  largeTitleHeight = 25,
}) => {
  
  const { 
    headerTextOpacity, 
    scrollAnimatedValue, 
    animatedScale, 
    handleScroll, 
    onLayout, 
    headerOpacity
  } = useHeaderAnimation();

  return (
    <>
      <View style={[styles.headerComponentContainer, {height: height}]}>
      {headerContent && headerContent()}
      {isTitleVisible && (
        <Animated.Text style={[styles.headline, {opacity: isLargeTitleVisible ? headerTextOpacity : 1}]}>
          {title}
        </Animated.Text>
      )}
        <Animated.View style={[styles.headerBottomBorder, {opacity: headerOpacity}]} />
      </View>

      <ScrollView
        onScroll={Animated.event([{ 
          nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={8}
      >
        {isLargeTitleVisible && (
          <>
          <View style={{height: largeTitleHeight}} />
          <Animated.Text
            style={[ styles.title, {
                transform: [{ scale: animatedScale }],
                transformOrigin: 'bottom left',
              },
            ]}
            onLayout={onLayout}>
            {title}
          </Animated.Text>
          </>
        )}
        {children}
      </ScrollView>
    </>
  );
};

export default HeaderScrollView;
