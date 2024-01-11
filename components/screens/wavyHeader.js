import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WavyHeader({ customStyles }) {
    return (
      <View  style={customStyles}>
        <ImageBackground source={require('../Assets/istockphoto.png')} style={{ backgroundColor: '#5100ca5d', height: (Dimensions.get('window').height)/3.5 }}>
            <Svg xmlns="http://www.w3.org/2000/Svg" 
                height="60%"
                width="100%"
                viewBox="0 0 1440 320" 
                style={{ position: 'absolute', top: (Dimensions.get('window').height)/6}}
            >
               <Path fill="#A36EE80d" fill-opacity="1" d="M0,128L40,133.3C80,139,160,149,240,176C320,203,400,245,480,229.3C560,213,640,139,720,133.3C800,128,880,192,960,197.3C1040,203,1120,149,1200,138.7C1280,128,1360,160,1400,176L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></Path>
            </Svg>
            <Svg xmlns="http://www.w3.org/2000/Svg" 
                height="60%"
                width="100%"
                viewBox="0 0 1440 320" 
                style={{ position: 'absolute', top: (Dimensions.get('window').height)/6}}
            >
               <Path fill="#f4f4f4" fill-opacity="1" d="M0,128L40,133.3C80,139,160,149,240,176C320,203,400,245,480,229.3C560,213,640,139,720,133.3C800,128,880,192,960,197.3C1040,203,1120,149,1200,138.7C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></Path>
            </Svg>
        </ImageBackground>
        </View>
    );
  }