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
  {timestamp: Date.now(), text: 'Sample Text', checked: false},
  {timestamp: Date.now(), text: 'Sample Text2', checked: false},
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

  const handleCheck = timestamp => {
    const newData = data.map(item => {
      if (item.timestamp === timestamp) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    setData(newData);
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
          textDecorationLine: item.checked ? 'line-through' : 'none', // 이 부분을 추가하세요.
        }}>
        <Pressable
          onPress={() => handleCheck(item.timestamp)}
          style={{
            width: hp(4),
            height: hp(4),
            backgroundColor: item.checked ? '#8d71fe' : '#8d71fe', // 체크 상태에 따라 배경색을 변경합니다.
            borderRadius: 4,
            marginHorizontal: wp(5),
            opacity: item.checked ? 1 : 0.2, // 체크 상태에 따라 불투명도를 변경합니다.
          }}
        />
        <Text
          style={{
            width: wp(50),
            textDecorationLine: item.checked ? 'line-through' : 'none',
          }}>
          {item.text}
        </Text>
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style={'auto'} />
      <View style={styles.header}>
        <Text style={styles.headerText}>✔ To do list</Text>
      </View>
      <SwipeListView
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={wp(10)}
        rightOpenValue={-wp(10)}
        style={styles.listView}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          placeholder="please write the text."
          placeholderTextColor="#aaa"
          onChangeText={item => setText(item)}
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text>➕</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  header: {
    width: wp(100),
    height: hp(20),
    justifyContent: 'center',
    paddingLeft: wp(10),
  },
  headerText: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  listView: {
    flex: 1, // 이 부분은 `SwipeListView`가 사용할 수 있는 모든 공간을 차지하도록 합니다.
  },
  inputContainer: {
    width: wp(100),
    flexDirection: 'row',
    paddingHorizontal: wp(10),
    paddingBottom: hp(2),
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    marginRight: wp(5),
    borderRadius: 10,
    paddingLeft: wp(3),
    marginTop: 10,
  },
  addButton: {
    width: hp(5),
    height: hp(5),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 10,
  },
});

export default App;
