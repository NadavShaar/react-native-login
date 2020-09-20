import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, G } from 'react-native-svg';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Actions } from 'react-native-router-flux';
import requestHandler from '../utils/requestHandler';
import { useDispatch } from 'react-redux';
import { setUser } from './../store/actions';

const Login = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        requestHandler({action: 'login', data: {username, password}})
            .then(res => {
                const { authToken, user } = res.data;
                localStorage.setItem("authToken", JSON.stringify(authToken));
                dispatch(setUser(user))
            })
            .then(Actions.home)
            .catch(err => console.error(err));
    }

    const disableSubmit = !username || !password;

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.top}>
                <TouchableOpacity onPress={Actions.welcome} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>LOGIN</Text>
                { BG_SVG }
                { SHAPE_SVG }
            </View>
            <View style={styles.bottom}>
                <View>
                    <Text style={styles.inputLabel}>Username:</Text>
                    <View style={styles.inputContainer}>
                        <AntDesign name="user" size={20} color="#ffc800" />
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                            autoFocus
                        />
                    </View>
                    <Text style={styles.inputLabel}>Password:</Text>
                    <View style={styles.inputContainer}>
                        <Entypo name="key" size={20} color="#ffc800" />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit} disabled={disableSubmit} style={styles.loginBtn}>
                        {
                            disableSubmit ?
                                <View style={[styles.registerButton, {backgroundColor: '#ddd'}]}>
                                    <Text style={{color: '#fff'}}>LOGIN</Text>
                                </View>
                                :
                                <LinearGradient style={styles.registerButton} colors={['#1d094b', '#470bac']}>
                                    <Text style={{color: '#fff'}}>LOGIN</Text>
                                </LinearGradient>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        flexDirection: 'column'
    },  
    top: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative'
    },
    bgPattern: {
        position: 'absolute',
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0
    },
    pageTitle: {
        color: '#ffc800', 
        fontSize: 48, 
        fontFamily: 'monospace', 
        position: 'absolute', 
        top: 70, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        zIndex: 1
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        fontFamily: 'sans-serif',
        paddingLeft: 10,
        paddingRight: 10
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5, 
        justifyContent: 'space-between',
        margin: 20,
        marginTop: 10,
        borderBottomColor: '#470bac',
        borderBottomWidth: 2
    },
    inputLabel: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        color: '#470bac',
        fontSize: 16,
        fontFamily: 'sans-serif'
    },
    loginBtn: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6.68,
        elevation: 11,
    },
    backButton: {
        zIndex: 2, 
        position: 'absolute', 
        top: 30, 
        left: 30
    },
    registerButton: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

const BG_SVG = <Svg preserveAspectRatio="none" style={styles.bgPattern} xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'>
    <Rect fill='#0e001f' width='1600' height='800' />
    <G>
        <Path fill='#0e001f' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z' />
        <Path fill='#15052d' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z' />
        <Path fill='#18093b' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z' />
        <Path fill='#1d094b' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/>
        <Path fill='#22085b' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/>
        <Path fill='#27066b' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/>
        <Path fill='#310880' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/>
        <Path fill='#3c0996' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/>
        <Path fill='#470bac' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/>
        <Path fill='#5e0fdb' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z' />
    </G>
</Svg>;

const SHAPE_SVG = <Svg
    style={{zIndex: 1}}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 320"
    preserveAspectRatio="xMaxYMax meet"
>
    <Path 
        fill="#ffffff" 
        fillOpacity="1" 
        d="M0,64L48,58.7C96,53,192,43,288,80C384,117,480,203,576,197.3C672,192,768,96,864,64C960,32,1056,64,1152,69.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    >
    </Path>
</Svg>;

export default Login;