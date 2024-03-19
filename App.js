import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SwipeListView} from 'react-native-swipe-list-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// 목데이터
const DATA = [
  {timestamp: Date.now(), text: 'Sample Text'},
  {timestamp: Date.now(), text: 'Sample Text2'},
];

function App() {
  const [text, setText] = React.useState('');
  const [data, setData] = useState(DATA);

  const handleDelete = timestamp => {
    const res = data.filter(item => item.timestamp !== timestamp);
    setData([...res]);
  };

  const handleAdd = () => {
    const res = {
      timestamp: Date.now(),
      text: text,
    };
    setData([...data, res]);
  };

  const renderItem = ({item, index}) => {
    return (
      // wp, hp 를 사용하는 이유
      // 디바이스 화면크기에 대한 퍼센티지(%) 값을 기반으로 크기를 계산함
      // 리액트로 따지면 wp(80)은 width: 80% 랑 동일함
      // 이렇게 함으로써 어떤 디바이스에서든 위치가 동일하게 표시됨

      // marginHorizontal : marginLeft와 marginRight를 동일하게 값을 지정하기 위해 사용됨
      // 예를들면 marginLeft(10), marginRight(10) 을 줄때 marginHorizontal을 사용하면됨
      // 왼쪽, 오른쪽만 값을 주는거고 위 아래는 값을 주지 않음
      <View
        style={{
          width: wp(90),
          height: wp(90) / 4,
          backgroundColor: '#FFF',
          marginHorizontal: wp(5),
          borderRadius: 10,
          marginBottom: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: hp(4),
            height: hp(4),
            backgroundColor: '#8d71fe',
            borderRadius: 4,
            marginHorizontal: wp(5),
            opacity: 0.4,
          }}
        />
        <Text style={{width: wp(50)}}>{item.text}</Text>
        <View
          style={{
            width: hp(2),
            height: hp(2),
            backgroundColor: '#8d71fe',
            borderRadius: 100,
            marginHorizontal: wp(3),
          }}
        />
      </View>
    );
  };

  const renderHiddenItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
        }}>
        <Pressable onPress={null}>
          <Text style={{fontSize: hp(3)}}>✍️</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.timestamp)}>
          <Text style={{fontSize: hp(3)}}>🗑️</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 키보드 올라오면 화면이 전체 위로 올라가도록 하는 태그 ( KeyboardAwareScrollView ) */}
      <KeyboardAwareScrollView bounces={false}>
        <View
          style={{
            width: wp(100),
            height: hp(20),
            justifyContent: 'center',
            paddingLeft: wp(10),
          }}>
          <Text style={{fontSize: hp(3), fontWeight: 'bold'}}>
            ✔ To do list
          </Text>
        </View>
        <View
          style={{
            width: wp(100),
            height: hp(70),
          }}>
          <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={wp(10)}
            rightOpenValue={-wp(10)}
          />
        </View>
        <View style={{width: wp(100), height: hp(10), flexDirection: 'row'}}>
          <TextInput
            value={text}
            placeholder="please write the text."
            placeholderTextColor="#aaa"
            onChangeText={item => setText(item)}
            style={{
              width: wp(60),
              marginLeft: wp(10),
              backgroundColor: '#fff',
              height: hp(5),
              paddingLeft: wp(3),
              borderRadius: 10,
            }}
          />
          <Pressable
            style={{
              width: hp(5),
              height: hp(5),
              marginLeft: wp(10),
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
            onPress={handleAdd}>
            <Text>➕</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <StatusBar style={'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
});

export default App;
