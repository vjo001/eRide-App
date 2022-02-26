import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert
} from "rect-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");

export default class RideScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeId: "",
      userId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
          */
        hasCameraPermissions: status === "granted",
        domState: "scanner",
        scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      bikeId: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { bikeId, userId, domState, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Text style={styles.title}>e-ride</Text>
          <Text style={styles.subtitle}>An Eco-Friendly Ride</Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.textinputContainer}>
          <TextInput
          style={[styles.textinput, { width: "82%" }]}
          placeholder={"User ID"}
          placeholderTextColor={"#FFFFFF"}
          value={userId}
        />
        </View>
      </View>
    )
  }