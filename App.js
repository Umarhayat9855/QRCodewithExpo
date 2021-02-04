import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasPermission:null,
      setHasPermission:null,
      scanned:false,
      setScanned:false,
     }
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({setScanned:true})
    // setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasPermission: status === 'granted',
    });
  };
  render() { 
    return ( 
      <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({setScanned:false})} />}
    </View>
     );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});