import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getCities} from '../../api/space_api';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class CitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      modalY: new Animated.Value(deviceHeight),
    };
  }

  componentDidMount() {
    // Animated.timing(this.state.modalY, {
    //   duration: 500,
    //   toValue: 0,
    // }).start();
    this.loadCities();
  }

  loadCities = async () => {
    const cities = await getCities();
    console.log('cityes', cities);
    this.setState({
      cities: cities,
    });
  };

  getExtendStyle(item) {
    const cityWidth = {width: deviceWidth / this.props.cityGrid};
    const selectedBg = {backgroundColor: this.props.selectedBg};
    const cityTextCenter = this.props.cityGrid === 1 ? {} : {alignItems: 'center'};
    const selectedStyle = this.props.selectedName === item.name ? selectedBg : {};

    console.log('selectedStyle', selectedStyle, this.props.selectedName, item);
    const extendStyle = {
      ...cityWidth,
      ...cityTextCenter,
      ...selectedStyle,
    };
    return extendStyle;
  }

  renderCityItem(cityData) {
    return (
      <FlatList
        numColumns={this.props.cityGrid}
        removeClippedSubviews
        keyExtractor={(item, index) => `cityItem${item.name}`}
        data={cityData}
        // getItemLayout={length: 1000}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.city, this.getExtendStyle(item)]}
            key={item.name}
            onPress={() => {
              this.props.selectCity(item);
            }}>
            <Text style={styles.cityText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  renderHeader() {
    const cancelText = {
      color: this.props.cancelColor,
      fontSize: this.props.cancelSize,
    };
    if (this.props.hasHeader) {
      return (
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancel} onPress={this.props.cancelCity}>
            <Text style={cancelText}>{this.props.cancelText}</Text>
          </TouchableOpacity>
          <View style={styles.titleText}>
            <Text>{this.props.titleText}</Text>
          </View>
        </View>
      );
    }
  }

  renderCities() {
    return (
      <FlatList
        removeClippedSubviews
        initialListSize={1000}
        keyExtractor={(item, index) => `letter${index}`}
        data={this.state.cities}
        renderItem={({item}) => (
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.cityBox}>{this.renderCityItem(item.items)}</View>
          </View>
        )}
      />
    );
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return <View style={{flex: 1}}>{this.renderCities()}</View>;
  }
}

CitySelect.defaultProps = {
  selectedName: '',
  cancelText: '取消',
  titleText: '选择城市',
  hasHeader: true,
  cancelColor: '#51a8fb',
  cancelSize: 14,
  selectedBg: '#26A1FD',
  cityGrid: 1,
  isVisible: true,
};

CitySelect.propTypes = {
  hasHeader: PropTypes.bool,
  cancelText: PropTypes.string,
  cancelColor: PropTypes.string,
  cancelSize: PropTypes.number,
  titleText: PropTypes.string,
  selectedName: PropTypes.string,
  selectedBg: PropTypes.string,
  cityGrid: PropTypes.number,
  isVisible: PropTypes.bool,
  cancelCity: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired,
  // cityData: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  header: {
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  cancel: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  title: {
    backgroundColor: '#F2F2F2',
    padding: 10,
    paddingLeft: 15,
    color: '#333',
    fontSize: 17,
  },
  cityBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  city: {
    height: 50,
    padding: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f3f3f3',
    justifyContent: 'center',
  },
  cityText: {
    color: '#333',
    fontSize: 16,
  },
});

export default CitySelect;
