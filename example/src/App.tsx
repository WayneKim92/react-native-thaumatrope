import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useState } from 'react';

export default function App() {
  const degree = useSharedValue(0);
  const speed = useSharedValue(500);
  const [animation, setAnimation] = useState(false);

  const handlePress = () => {
    if (!animation) {
      degree.value = withSequence(
        withTiming(180, { duration: 500 }),
        withTiming(360, { duration: 500 }),
        withTiming(180, { duration: 400 }),
        withTiming(360, { duration: 400 }),
        withTiming(180, { duration: 300 }),
        withTiming(360, { duration: 300 }),
        withTiming(180, { duration: 200 }),
        withTiming(360, { duration: 200 }),
        withTiming(180, { duration: 100 }),
        withTiming(360, { duration: 100 }),
        withTiming(180, { duration: 50 }),
        withTiming(360, { duration: 50 }),
        withTiming(180, { duration: 18 }),
        withTiming(360, { duration: 18 }, () => {
          speed.value = 18;
        }),
        withRepeat(
          withSequence(
            withTiming(180, { duration: 18 }),
            withTiming(360, { duration: 18 })
          ),
          -1,
          true
        )
      );
    } else {
      degree.value = 0;
      speed.value = 500;
    }

    setAnimation(!animation);
  };

  const birdAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${degree.value}deg` }],
      opacity: degree.value < 90 || degree.value > 270 ? 1 : 0,
    };
  });

  const cageAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${degree.value}deg` }],
      opacity: degree.value >= 90 && degree.value <= 270 ? 1 : 0,
    };
  });

  const textAnimation = useAnimatedStyle(() => {
    console.log(speed.value);
    return {
      opacity: speed.value < 100 ? 1 : 0,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {
              width: 300,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            },
            birdAnimation,
          ]}
        >
          <Animated.Image
            source={require('../assets/bird.png')}
            style={{ width: 80, height: 100, top: 40 }}
          />
        </Animated.View>
        <Animated.Image
          source={require('../assets/cage.png')}
          style={[
            {
              width: 300,
              height: 300,
              position: 'absolute',
            },
            cageAnimation,
          ]}
        />
      </Animated.View>
      <Button
        onPress={handlePress}
        title={`${animation ? 'Stop' : 'Start'} Thaumatrope`}
      />

      <Animated.View style={textAnimation}>
        <Text style={{ fontSize: 40 }}>Ta-da!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});
